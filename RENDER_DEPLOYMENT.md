# Deploy UNO Sight Words to Render

## Quick Deployment Guide

### Prerequisites
1. Push your code to GitHub
2. Create a free Render account at https://render.com
3. Have your GitHub repo ready

---

## Step 1: Create Redis Database

1. In Render Dashboard, click **New +** → **Redis**
2. Name: `uno-redis`
3. Plan: **Free**
4. Click **Create Redis**
5. **Save the connection details** (you'll need them)

---

## Step 2: Deploy the API (Backend)

1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `uno-sight-words-api`
   - **Region**: Oregon (Free)
   - **Branch**: main
   - **Root Directory**: `packages/unapy`
   - **Environment**: Node
   - **Build Command**:
     ```bash
     npm install --legacy-peer-deps && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
   - **Plan**: Free

4. **Environment Variables** - Add these:
   ```
   NODE_ENV=production
   PORT=10000
   REDIS_HOST=<your-redis-host-from-step-1>
   REDIS_PORT=<your-redis-port-from-step-1>
   REDIS_PASSWORD=<your-redis-password-from-step-1>
   STATIC_FILES_BASE_URL=https://uno-sight-words-api.onrender.com/assets
   ```

5. Click **Create Web Service**

6. **Wait for deployment** (~5 minutes)

7. **Copy the API URL** (e.g., `https://uno-sight-words-api.onrender.com`)

---

## Step 3: Deploy the Frontend

1. Click **New +** → **Static Site**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `uno-sight-words-frontend`
   - **Branch**: main
   - **Root Directory**: `packages/unoenty`
   - **Build Command**:
     ```bash
     npm install --legacy-peer-deps && REACT_APP_API_URL=https://uno-sight-words-api.onrender.com npm run build
     ```
   - **Publish Directory**: `build`

4. **Environment Variables** - Add these:
   ```
   REACT_APP_API_URL=https://uno-sight-words-api.onrender.com
   ```
   (Replace with YOUR actual API URL from Step 2)

5. Click **Create Static Site**

6. **Wait for deployment** (~3-5 minutes)

---

## Step 4: Test Your Deployment

1. Visit your frontend URL (e.g., `https://uno-sight-words-frontend.onrender.com`)
2. Create a new game
3. Check your API logs in Render - you should see the word mapping:
   ```
   === New Game Word Mapping ===
   Number -> Word assignments for this game:
     0 -> jump
     1 -> funny
     ...
   ============================
   ```

---

## Troubleshooting

### API Won't Start
- Check Redis connection variables are correct
- Verify `REDIS_HOST`, `REDIS_PORT`, and `REDIS_PASSWORD`
- Check API logs for errors

### Frontend Can't Connect to API
- Verify `REACT_APP_API_URL` matches your actual API URL
- Check CORS settings (should be OK by default)
- Rebuild frontend with correct API URL

### Free Tier Limitations
- Services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Upgrade to paid plan ($7/month) for always-on

---

## Alternative: Simpler One-Click Deploy

If the above is too complex, try these platforms with better monorepo support:

### Railway (Recommended - Easiest)
1. Go to https://railway.app
2. "Start a New Project"
3. Connect GitHub repo
4. Railway auto-detects the monorepo
5. Add Redis service (one click)
6. Deploy!

### Heroku
1. Create Heroku app
2. Add Redis addon
3. Deploy with Git push

Both handle the monorepo better and have simpler setups.

---

## Cost Comparison

| Platform | API | Frontend | Redis | Total |
|----------|-----|----------|-------|-------|
| Render Free | ✅ Free | ✅ Free | ✅ Free | $0 |
| Railway Free | ✅ Free | ✅ Free | ✅ Free | $0 |
| Heroku Hobby | $7 | N/A (static) | $0 | $7 |

All have free tiers suitable for testing!
