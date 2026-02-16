# 🛠️ Foundry - Override Settings

This Foundry VTT module overrides various core and D&D5e settings, including keybindings and permissions like summoning and polymorphing.  

---

## 🎯 What It Does

By default, D&D5e keybindings are:

- Alt — Skip Dialog  
- Alt + Click — Advantage/Critical  
- Alt + Right Click — Disadvantage/No Crit  

This module remaps them to the following keys and applies other configurable D&D5e world settings:

- **Keybindings:**  
  - Skip Dialog (Normal): `AltLeft`, `AltRight`  
  - Skip Dialog (Advantage): `ShiftLeft`, `ShiftRight`  
  - Skip Dialog (Disadvantage): `ControlLeft`, `ControlRight`  

- **D&D5e World Settings:**  
  - `allowPolymorphing`  
  - `allowSummoning`  
  - `gridAlignedSquareTemplates`  
  - `autoCollapseItemCards`  
  - `autoCollapseChatTrays`  
  - `defaultSkills`  

All settings are loaded from a JSON config file, so you can tweak values without editing the JavaScript.

---

## ✅ Installation

1. In Foundry VTT, go to **Add-on Modules → Install Module**.  
2. Paste the manifest URL:  
   `https://raw.githubusercontent.com/vfez1/foundry-override-settings/main/module.json`  
3. Click **Install**, then **Enable** the module in your world.  

> 🧠 Requires the [`lib-wrapper`](https://github.com/ruipin/fvtt-lib-wrapper) module to be installed and enabled.  

---

## 🔧 Compatibility

- **Foundry VTT:** v13  
- **DnD5e System:** v4.3.x+  
- Tested with all keybinding overrides and JSON-configurable D&D5e settings.

---

## ⚙️ Configuration

Settings are stored in `settings.json` (same folder as the module JS file). You can change keybindings, core Foundry settings, and D&D5e permissions without editing the JavaScript directly.  

Example snippet of `settings.json`:

```json
{
  "core": {
    "leftClickRelease": true,
    "chatBubblesPan": false
  },
  "dnd5e": {
    "allowSummoning": true,
    "allowPolymorphing": true,
    "gridAlignedSquareTemplates": true,
    "autoCollapseItemCards": false,
    "autoCollapseChatTrays": "older",
    "defaultSkills": ["acr","ani","arc","ath","dec","his","ins","itm"]
  },
  "keybindings": {
    "dnd5e.skipDialogNormal": ["AltLeft","AltRight"],
    "dnd5e.skipDialogAdvantage": ["ShiftLeft","ShiftRight"],
    "dnd5e.skipDialogDisadvantage": ["ControlLeft","ControlRight"]
  }
}
