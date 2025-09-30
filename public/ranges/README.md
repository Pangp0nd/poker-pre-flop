# Range Images Directory

This directory contains poker range chart images organized by table type, player count, stack size, and range type.

## Folder Structure

```
/ranges/
├── CASH/
│   ├── 6MAX/
│   │   ├── 100BB/
│   │   │   ├── RFI/
│   │   │   │   ├── UTG.jpg
│   │   │   │   ├── MP-HJ.jpg
│   │   │   │   ├── CO.jpg
│   │   │   │   ├── BTN.jpg
│   │   │   │   ├── SB.jpg
│   │   │   │   └── BB.jpg
│   │   │   └── 3BET/
│   │   │       ├── BTN_vs_UTG.jpg
│   │   │       └── ... (other combinations)
│   │   ├── 60BB/
│   │   └── ... (other stack sizes)
│   ├── 8MAX/
│   │   └── 100BB/
│   │       └── RFI/
│   │           ├── UTG.jpg
│   │           ├── UTG1.jpg
│   │           ├── MP-LJ.jpg
│   │           ├── MP1-HJ.jpg
│   │           ├── CO.jpg
│   │           ├── BTN.jpg
│   │           ├── SB.jpg
│   │           └── BB.jpg
│   └── 9MAX/
│       └── ... (similar structure)
└── MTT/
    ├── 6MAX/
    ├── 8MAX/
    │   └── 100BB/
    │       └── RFI/
    │           ├── UTG.jpg
    │           ├── UTG1.jpg
    │           ├── MP-LJ.jpg
    │           ├── MP1-HJ.jpg
    │           ├── CO.jpg
    │           ├── BTN.jpg
    │           ├── SB.jpg
    │           └── BB.jpg
    └── 9MAX/
        └── ... (similar structure)
```

## Current File Path Convention

### RFI Ranges:

`/ranges/{TABLE_TYPE}/{PLAYERS}/{STACK_SIZE}/RFI/{POSITION}.jpg`

Examples:

- `/ranges/MTT/8MAX/100BB/RFI/UTG.jpg`
- `/ranges/CASH/6MAX/100BB/RFI/BTN.jpg`
- `/ranges/MTT/9MAX/30BB/RFI/CO.jpg`

### vs RFI Ranges:

`/ranges/{TABLE_TYPE}/{PLAYERS}/{STACK_SIZE}/vsRFI/{MY_POSITION}vs{OPPONENT_POSITION}.jpg`

Examples:

- `/ranges/MTT/8MAX/100BB/vsRFI/BTNvsUTG.jpg`
- `/ranges/CASH/6MAX/100BB/vsRFI/BBvsBTN.jpg`
- `/ranges/MTT/9MAX/30BB/vsRFI/COvsMP.jpg`

### vs 3-Bet Ranges:

`/ranges/{TABLE_TYPE}/{PLAYERS}/{STACK_SIZE}/vs3Bet/{MY_POSITION}vs{OPPONENT_POSITION}.jpg`

Examples:

- `/ranges/MTT/8MAX/100BB/vs3Bet/BTNvsUTG.jpg`
- `/ranges/CASH/6MAX/100BB/vs3Bet/BBvsBTN.jpg`
- `/ranges/MTT/9MAX/30BB/vs3Bet/COvsMP.jpg`

## Parameters:

### Table Types:

- `CASH` - Cash games
- `MTT` - Multi-table tournaments

### Players:

- `6MAX` - 6-max tables
- `8MAX` - 8-max tables
- `9MAX` - 9-max tables

### Stack Sizes:

- `100BB` - 100bb+
- `60BB`, `50BB`, `40BB`, `30BB`
- `20BB-NO-LIMP` - 20bb (No limp)
- `10bb-no-limp` - 10 (No limp)

### Positions (Player-Count Dependent):

#### 6-Max Tables:

- `UTG.jpg` (from id: "utg")
- `MP.jpg` (from id: "mp")
- `CO.jpg` (from id: "co")
- `BTN.jpg` (from id: "btn")
- `SB.jpg` (from id: "sb")
- `BB.jpg` (from id: "bb")

#### 8-Max Tables:

- `UTG.jpg` (from id: "utg")
- `UTG1.jpg` (from id: "utg1")
- `MP.jpg` (from id: "mp")
- `MP1.jpg` (from id: "mp1")
- `CO.jpg` (from id: "co")
- `BTN.jpg` (from id: "btn")
- `SB.jpg` (from id: "sb")
- `BB.jpg` (from id: "bb")

#### 9-Max Tables:

- `UTG.jpg` (from id: "utg")
- `UTG1.jpg` (from id: "utg1")
- `MP.jpg` (from id: "mp")
- `MP1.jpg` (from id: "mp1")
- `MP2.jpg` (from id: "mp2")
- `CO.jpg` (from id: "co")
- `BTN.jpg` (from id: "btn")
- `SB.jpg` (from id: "sb")
- `BB.jpg` (from id: "bb")

## File Name Mapping:

- File names are generated directly from the position `id` field
- Simply convert `id` to uppercase and add `.jpg` extension
- Examples:
  - id: "utg" → `UTG.jpg`
  - id: "mp1" → `MP1.jpg`
  - id: "mp2" → `MP2.jpg`
