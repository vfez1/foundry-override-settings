Hooks.once("ready", () => {
    console.log("🔁 [custom-dnd5e-skipdialog] Hook: ready");

    const makeBinding = (key) => ({ key, modifiers: [], repeat: false });

    const overrideEditable = (key, newKeys) => {
        const action = game.keybindings.actions.get(key);
        if (!action) {
            console.warn(`❌ Action not found: ${key}`);
            return;
        }

        const formatted = newKeys.map(makeBinding);
        console.log(`🔁 Overriding ${key}:`, formatted);
        action.editable = formatted;

        const bindings = [...(action.uneditable ?? []), ...formatted];
        game.keybindings.bindings.set(key, bindings);
    };

    overrideEditable("dnd5e.skipDialogNormal", ["AltLeft", "AltRight"]);
    overrideEditable("dnd5e.skipDialogAdvantage", ["ShiftLeft", "ShiftRight"]);
    overrideEditable("dnd5e.skipDialogDisadvantage", [
        "ControlLeft",
        "ControlRight",
    ]);
});
