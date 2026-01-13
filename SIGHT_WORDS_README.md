# UNO Sight Words Game - Quick Start Guide

This modified UNO game replaces number cards (0-9) with Dolch Kindergarten sight words!

## What Changed

### Core Modifications:
1. **40 Dolch Kindergarten Sight Words** - Added to `packages/shared/protocols/typings/SightWords.ts`
2. **Random Word Assignment** - Each game randomly selects 10 words and maps them to numbers 0-9
3. **Word Matching Logic** - Cards match by sight word instead of number
4. **Visual Display** - Words overlay on cards with responsive sizing
5. **Debug Logging** - Console logs the word-to-number mapping when each game starts

### Files Modified:
- `packages/shared/protocols/` - Added SightWords.ts, updated Card.ts and Game.ts
- `packages/unapy/src/Services/CardService.ts` - Word assignment logic
- `packages/unapy/src/Services/GameService.ts` - Match logic and debug logging
- `packages/unapy/src/Controllers/CardController.ts` - Fixed API endpoint
- `packages/unoenty/src/pages/Table/` - Card rendering with word overlays
- `packages/unapy/tsconfig.json` - Added `skipLibCheck: true`
- `packages/unoenty/package.json` - Added legacy OpenSSL flag for Node.js 25

### Build System Fixes:
- Upgraded TypeScript from 3.9.2 to 4.9.5
- Added NODE_OPTIONS=--openssl-legacy-provider for Webpack compatibility with Node.js 25
- Updated @types/express to 4.17.21 for better compatibility

## Prerequisites

- Node.js v25 (or v14-18 recommended)
- Docker (for Redis)
- npm

## Quick Start

### 1. Install Dependencies

```bash
cd uno-custom/uno-custom
npm install --legacy-peer-deps
```

### 2. Start Redis (Required)

In a separate terminal:
```bash
npm run dev:resources
```

This starts Redis in Docker. Keep this running!

### 3. Start the API Server

In a separate terminal:
```bash
cd packages/unapy
npm run dev
```

The API will run on `http://localhost:5000`

**Watch for the console output!** You'll see:
```
=== New Game Word Mapping ===
Number -> Word assignments for this game:
  0 -> jump
  1 -> funny
  2 -> where
  ... (etc)
============================
```

### 4. Start the Frontend

In another terminal:
```bash
cd packages/unoenty
npm run dev
```

The game will open at `http://localhost:4000`

## How It Works

1. **Start a Game**: Create a new game room
2. **Random Words**: 10 random sight words are assigned to numbers 0-9
3. **Check Console**: The API terminal shows which words map to which numbers
4. **Play**: Match cards by color OR by sight word (just like matching by number in regular UNO)

## Example Game Session

When you start a game, you might see:
- Card "0" displays "jump"
- Card "1" displays "funny"
- Card "2" displays "where"
- ... etc

A red "jump" card can be played on:
- Any red card
- A "jump" card of any color
- A Wild card

## Sight Words List

The 40 Dolch Kindergarten words used:
```
a, and, away, big, blue, can, come, down, find, for,
funny, go, help, here, I, in, is, it, jump, little,
look, make, me, my, not, one, play, red, run, said,
see, the, three, to, two, up, we, where, yellow, you
```

## Troubleshooting

### Build Errors
If you get build errors, make sure:
1. You ran `npm install --legacy-peer-deps` in the root directory
2. TypeScript 4.9.5 is installed (`npm list typescript`)

### OpenSSL Errors
These are fixed in the package.json with `NODE_OPTIONS=--openssl-legacy-provider`

### Redis Connection Errors
Make sure Docker is running and Redis is started with `npm run dev:resources`

### Port Already in Use
- API uses port 5000
- Frontend uses port 4000
- Redis uses port 6379

Stop any conflicting services or change ports in the `.env` files.

## Development

### Adding More Words
Edit `packages/shared/protocols/typings/SightWords.ts` and add to the `DOLCH_KINDERGARTEN_SIGHT_WORDS` array.

### Changing Word Assignment
The random assignment happens in `CardService.generateRandomNumberToWordMapping()` in `packages/unapy/src/Services/CardService.ts`.

### Styling Words
Card word overlays are styled inline in:
- `packages/unoenty/src/pages/Table/CardDeck/index.tsx`
- `packages/unoenty/src/pages/Table/CardStack/index.tsx`

## Next Steps

Possible enhancements:
- Persist word mappings to track which words a child has seen
- Add difficulty levels (Dolch Pre-Primer, Primer, Grade 1, etc.)
- Track which words are matched most/least frequently
- Add pronunciation audio for each word
- Create flashcard mode between rounds

Enjoy teaching sight words with UNO! 🎴📚
