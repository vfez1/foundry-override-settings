Hooks.once("ready", async () => {
    console.log("🔁 [Override Settings] Hook: ready");
    // --- Load config file ---
    try {
        console.log("📝 Attempting to fetch settings.json...");
        const response = await fetch(
            "/modules/foundry-override-settings/settings.json"
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const config = await response.json();
        console.log("✅ Config file loaded successfully:", config);
        // --- Override keybindings ---
        console.log("📝 Overriding keybindings...");
        const makeBinding = (key) => ({ key, modifiers: [], repeat: false });
        const overrideEditable = (key, newKeys) => {
            const action = game.keybindings.actions.get(key);
            if (!action) {
                console.warn(`⚠️ Keybinding action not found for key: ${key}`);
                return;
            }
            console.log(
                `➡️ Overriding keybinding for '${key}' with new keys:`,
                newKeys
            );
            const formatted = newKeys.map(makeBinding);
            action.editable = formatted;
            const bindings = [...(action.uneditable ?? []), ...formatted];
            game.keybindings.bindings.set(key, bindings);
        };
        for (const [key, keys] of Object.entries(config.keybindings)) {
            overrideEditable(key, keys);
        }
        console.log("✅ Keybindings override complete.");
        // --- Override core settings ---
        console.log("📝 Overriding core settings...");
        for (const [key, value] of Object.entries(config.core)) {
            console.log(`➡️ Setting core key '${key}' to value:`, value);
            await game.settings.set("core", key, value);
        }
        console.log("✅ Core settings override complete.");
        // --- Override dnd5e settings ---
        console.log("📝 Overriding dnd5e settings...");
        for (const [key, value] of Object.entries(config.dnd5e)) {
            console.log(`➡️ Setting dnd5e key '${key}' to value:`, value);
            await game.settings.set("dnd5e", key, value);
        }
        console.log("✅ Dnd5e settings override complete.");
        // --- Override composite UI config ---
        console.log("📝 Overriding UI composite config...");
        const uiConfig = foundry.utils.deepClone(
            game.settings.get("core", "uiConfig")
        );
        uiConfig.fade.opacity = config.uiConfig.fadeOpacity;
        uiConfig.chatNotifications = config.uiConfig.chatNotifications;
        console.log("➡️ New UI config object:", uiConfig);
        await game.settings.set("core", "uiConfig", uiConfig);
        console.log("✅ UI config override complete.");
        console.log("✅ Settings loaded from config file");
    } catch (error) {
        console.error("❌ An error occurred while loading settings:", error);
    }
});
