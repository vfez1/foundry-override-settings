# 🛠️ Custom DnD5e Skip Dialog Keys

This Foundry VTT module overrides the default Dungeons & Dragons 5e keybindings for skipping roll dialogs using custom modifier keys (Alt, Shift, Ctrl).

## 🎯 What It Does

By default, the DnD5e system uses the following keys:

-   **Alt** — Skip Dialog
-   **Alt + Click** — Advantage/Critical
-   **Alt + Right Click** — Disadvantage/No Crit

This module remaps those to:

| Action                     | New Keys                      |
| -------------------------- | ----------------------------- |
| Skip Dialog (Normal)       | `AltLeft`, `AltRight`         |
| Skip Dialog (Advantage)    | `ShiftLeft`, `ShiftRight`     |
| Skip Dialog (Disadvantage) | `ControlLeft`, `ControlRight` |

These bindings apply automatically for all users and do not require configuration.

---

## ✅ Installation

1. In Foundry VTT, go to **Add-on Modules → Install Module**
2. Paste the following manifest URL:
   https://raw.githubusercontent.com/vfez1/custom-dnd5e-skipdialog/main/module.json

3. Click **Install**, then **Enable** the module in your world.

> 🧠 Requires the [`lib-wrapper`](https://github.com/ruipin/fvtt-lib-wrapper) module to be installed and enabled.

---

## 🔧 Compatibility

-   **Foundry VTT**: v12+
-   **DnD5e System**: v4.3.x+
-   Tested with `dnd5e.skipDialogNormal`, `dnd5e.skipDialogAdvantage`, and `dnd5e.skipDialogDisadvantage`.

---
