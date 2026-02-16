Hooks.once("ready", async () => {
    console.log("🔁 [Override Settings] Hook: ready");

    try {
        const response = await fetch(
            "/modules/foundry-override-settings/settings.json"
        );
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        const config = await response.json();
        console.log("✅ Loaded config:", config);

        // --- Override keybindings ---
        console.log("📝 Overriding keybindings...");
        const makeBinding = (entry) => {
            if (typeof entry === "string")
                return { key: entry, modifiers: [], repeat: false };
            return {
                key: entry.key,
                modifiers: entry.modifiers ?? [],
                repeat: entry.repeat ?? false,
            };
        };

        const overrideEditable = (key, newKeys) => {
            const action = game.keybindings.actions.get(key);
            if (!action)
                return console.warn(`⚠️ No keybinding found for ${key}`);
            console.log(`➡️ Overriding '${key}' with:`, newKeys);
            const formatted = newKeys.map(makeBinding);
            action.editable = formatted;
            const bindings = [...(action.uneditable ?? []), ...formatted];
            game.keybindings.bindings.set(key, bindings);
        };

        for (const [key, keys] of Object.entries(config.keybindings)) {
            overrideEditable(key, keys);
        }

        // --- Save only the keybindings that are in config ---
        const stored = JSON.parse(
            localStorage.getItem("core.keybindings") ?? "{}"
        );
        for (const key of Object.keys(config.keybindings)) {
            const binding = game.keybindings.bindings.get(key);
            if (binding) {
                stored[key] = binding;
                console.log(`💾 Saved keybinding '${key}'`);
            } else {
                console.warn(`⚠️ Could not find binding to save for '${key}'`);
            }
        }
        localStorage.setItem("core.keybindings", JSON.stringify(stored));
        console.log("✅ Selected keybindings saved to localStorage.");

        console.log("✅ Keybindings override complete.");

        // --- Apply all settings from any module namespace ---
        for (const [namespace, settings] of Object.entries(config)) {
            if (["keybindings", "uiConfig"].includes(namespace)) continue;
            console.log(`📝 Applying settings for namespace '${namespace}'...`);
            for (const [key, value] of Object.entries(settings)) {
                await game.settings.set(namespace, key, value);
            }
        }

        // --- UI Config ---
        const uiConfig = foundry.utils.deepClone(
            game.settings.get("core", "uiConfig")
        );
        uiConfig.fade.opacity = config.uiConfig.fadeOpacity;
        uiConfig.chatNotifications = config.uiConfig.chatNotifications;
        await game.settings.set("core", "uiConfig", uiConfig);
        console.log("✅ UI config override complete.");

        console.log("✅ All settings successfully applied!");
    } catch (error) {
        console.error("❌ Error while loading settings:", error);
    }
});
