Hooks.once("ready", async () => {
    console.log("🔁 [Override Settings] Hook: ready");

    // --- Load config file ---
    const response = await fetch("./settings.json");
    const config = await response.json();

    // --- Override keybindings ---
    const makeBinding = (key) => ({ key, modifiers: [], repeat: false });
    const overrideEditable = (key, newKeys) => {
        const action = game.keybindings.actions.get(key);
        if (!action) return;
        const formatted = newKeys.map(makeBinding);
        action.editable = formatted;
        const bindings = [...(action.uneditable ?? []), ...formatted];
        game.keybindings.bindings.set(key, bindings);
    };

    for (const [key, keys] of Object.entries(config.keybindings)) {
        overrideEditable(key, keys);
    }

    // --- Override core settings ---
    for (const [key, value] of Object.entries(config.core)) {
        await game.settings.set("core", key, value);
    }

    // --- Override dnd5e settings ---
    for (const [key, value] of Object.entries(config.dnd5e)) {
        await game.settings.set("dnd5e", key, value);
    }

    // --- Override composite UI config ---
    const uiConfig = foundry.utils.deepClone(
        game.settings.get("core", "uiConfig")
    );
    uiConfig.fade.opacity = config.uiConfig.fadeOpacity;
    uiConfig.chatNotifications = config.uiConfig.chatNotifications;
    await game.settings.set("core", "uiConfig", uiConfig);

    console.log("✅ Settings loaded from config file");
});
