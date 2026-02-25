# 🚀 GitHub Actions Auto Price Updater Setup Guide

This guide explains how to set up automatic NDIS price updates using GitHub Actions.

---

## 📋 What This Does

The GitHub Actions workflow will:
- ✅ Run **automatically every Monday at 6 AM AEST**
- ✅ Download the latest NDIS Support Catalogue from the official website
- ✅ Check if prices have changed (using file hash comparison)
- ✅ Update your Supabase database if changes are detected
- ✅ Log all updates to the `ndis_price_update_logs` table
- ✅ Send optional email notifications when updates occur

---

## 🔧 Setup Steps

### Step 1: Push Your Code to GitHub

**YES, you need to push your code to GitHub first!**

```bash
# Make sure you're on your branch
git status

# Add all files (if not already committed)
git add .

# Commit your changes
git commit -m "Add NDIS price auto-updater with GitHub Actions"

# Push to GitHub
git push origin habiba
```

> **Note:** The workflow files are already in place:
> - `.github/workflows/ndis-price-updater.yml` - The GitHub Actions workflow
> - `scripts/github_price_updater.py` - The Python script

---

### Step 2: Set Up GitHub Secrets

GitHub Secrets store your Supabase credentials securely so they're not exposed in your code.

#### 2.1 Go to Your Repository Settings
1. Go to your GitHub repository: `https://github.com/YOUR-USERNAME/jschoice-website`
2. Click **Settings** (top right)
3. In the left sidebar, click **Secrets and variables** → **Actions**

#### 2.2 Add Required Secrets

Click **New repository secret** and add these **3 secrets**:

| Secret Name | Value | Where to Get It |
|-------------|-------|----------------|
| `SUPABASE_URL` | `https://browkzylcbkgaoacijqm.supabase.co` | From your `.env` file (NEXT_PUBLIC_SUPABASE_URL) |
| `SUPABASE_SERVICE_KEY` | Your service role key | From your `.env` file (SUPABASE_SERVICE_ROLE_KEY) |
| `NOTIFICATION_EMAIL` (Optional) | `your-email@example.com` | Your email for update notifications |

#### 2.3 Add Email Notification Secrets (Optional)

If you want email notifications when prices update, add these additional secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `SMTP_USER` | Your Gmail address | E.g., `your-email@gmail.com` |
| `SMTP_PASS` | Gmail App Password | See instructions below |

**How to get Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Factor Authentication (required)
3. Search for "App Passwords"
4. Create a new app password for "Mail"
5. Copy the 16-character password

---

### Step 3: Run the Workflow

You have **2 options**:

#### Option A: Run Manually (Recommended First Time)

1. Go to your GitHub repository
2. Click the **Actions** tab (top menu)
3. Click **NDIS Price Guide Updater** (left sidebar)
4. Click **Run workflow** (right side)
5. Select your branch (e.g., `habiba`)
6. Click the green **Run workflow** button

**First Run Options:**
- ☑️ Check "Force update" if you want to update even if no changes detected
- This is useful for the first run to populate your database

#### Option B: Wait for Automatic Schedule

The workflow runs automatically:
- **Every Monday at 6 AM AEST** (Sunday 8 PM UTC)
- No action required - it runs on its own!

---

## 📊 Monitoring the Workflow

### View Workflow Runs

1. Go to your repository's **Actions** tab
2. You'll see all workflow runs listed
3. Click any run to see:
   - ✅ Success/failure status
   - 📊 Detailed logs for each step
   - 📈 Summary with update statistics

### Workflow Steps

The workflow performs these steps:
1. **Setup:** Install Python and dependencies
2. **Run Script:** Execute `github_price_updater.py`
3. **Notify:** Send email if updates occurred (optional)
4. **Summary:** Show results in GitHub Actions

### Reading the Logs

**Successful Run:**
```
🚀 NDIS Price Guide Updater
✅ Found catalogue URL: https://...
📥 Downloading catalogue from: https://...
✅ Downloaded 2.5 MB
📊 Parsing catalogue data...
✅ Parsed 1234 support items
🔄 Transforming data...
✅ Transformed 1234 records
📤 Updating Supabase...
  📊 To add: 50, To remove: 5, To update: 1179
  ✅ Upserted batch 1/3
  ✅ Upserted batch 2/3
  ✅ Upserted batch 3/3
✅ UPDATE COMPLETED SUCCESSFULLY!
```

**No Changes:**
```
🚀 NDIS Price Guide Updater
✅ Downloaded catalogue
📋 Hash comparison:
  Old: a1b2c3d4e5f6...
  New: a1b2c3d4e5f6...
✅ No changes detected. Catalogue is up to date.
```

---

## 🔍 Verify Updates in Supabase

After a successful run:

### 1. Check Support Items
- Go to Supabase Dashboard → **Table Editor** → `ndis_support_items`
- You should see all support items populated

### 2. Check Update Logs
- Go to **Table Editor** → `ndis_price_update_logs`
- View the latest entry showing:
  - Timestamp
  - Items added/removed/updated
  - File hash
  - Status

### 3. Test on Your Website
```bash
npm run dev
```
Visit: https://jschoice-website.vercel.app/tools/ndis-price-guide

Try searching for support items like:
- "assistance"
- "transport"
- "nursing"

---

## 🛠️ Customization

### Change Schedule

Edit `.github/workflows/ndis-price-updater.yml`:

```yaml
schedule:
  # Current: Every Monday at 6 AM AEST
  - cron: '0 20 * * 0'

  # Examples:
  # Daily at 6 AM AEST: '0 20 * * *'
  # Every Friday: '0 20 * * 4'
  # First of every month: '0 20 1 * *'
```

**Cron Format:** `minute hour day-of-month month day-of-week`
- Times are in UTC (AEST = UTC + 10)
- Use https://crontab.guru/ to generate cron expressions

### Disable Email Notifications

Comment out or remove lines 76-99 in the workflow file:

```yaml
# - name: Send notification on update
#   if: steps.price_check.outputs.updated == 'true'
#   uses: dawidd6/action-send-mail@v3
#   ...
```

### Test Locally

You can test the Python script locally:

```bash
# Set environment variables
export SUPABASE_URL="your-url"
export SUPABASE_SERVICE_KEY="your-key"

# Run the script
python scripts/github_price_updater.py
```

---

## ❓ Troubleshooting

### Workflow Failed - "SUPABASE_URL not found"
**Solution:** Make sure you added the GitHub Secrets correctly (Settings → Secrets → Actions)

### Workflow Failed - "Could not download catalogue"
**Solution:**
- NDIS website might be down
- The catalogue URL structure may have changed
- Check the logs for the exact error
- Try running with "Force update" checked

### Workflow Failed - "Invalid credentials"
**Solution:**
- Verify your `SUPABASE_SERVICE_KEY` secret is correct
- Make sure you're using the **service role key**, not the anon key
- Check Supabase Dashboard → Settings → API

### No Email Notifications
**Solution:**
- Verify `SMTP_USER` and `SMTP_PASS` secrets are set
- Check you're using a Gmail App Password, not your regular password
- Enable 2FA on your Google account first

### Items Not Showing on Website
**Solution:**
- Check the workflow completed successfully
- Verify data exists in Supabase `ndis_support_items` table
- Check your `.env` has correct Supabase credentials
- Restart your dev server: `npm run dev`

---

## 📈 Monitoring Best Practices

### Weekly Checks
- Review the Actions tab weekly
- Check for any failed runs
- Monitor the update logs in Supabase

### Email Notifications
- Set up email notifications (optional but recommended)
- You'll be notified automatically when:
  - New items are added
  - Items are removed
  - Prices change

### Manual Triggers
Run manually when:
- NDIS announces a price update
- You make database schema changes
- Testing after code updates

---

## 🎯 Quick Reference

### File Locations
```
.github/workflows/ndis-price-updater.yml  → GitHub Actions workflow
scripts/github_price_updater.py           → Python updater script
```

### Required GitHub Secrets
```
SUPABASE_URL              → Your Supabase project URL
SUPABASE_SERVICE_KEY      → Service role key (required)
NOTIFICATION_EMAIL        → Email for notifications (optional)
SMTP_USER                 → Gmail for sending (optional)
SMTP_PASS                 → Gmail app password (optional)
```

### Workflow Schedule
```
Every Monday at 6 AM AEST (Sunday 8 PM UTC)
Manual runs available anytime
```

---

## ✅ Setup Checklist

- [ ] Code pushed to GitHub
- [ ] `SUPABASE_URL` secret added
- [ ] `SUPABASE_SERVICE_KEY` secret added
- [ ] `NOTIFICATION_EMAIL` secret added (optional)
- [ ] `SMTP_USER` and `SMTP_PASS` secrets added (optional)
- [ ] First manual run completed successfully
- [ ] Data verified in Supabase
- [ ] Website tested and working
- [ ] Email notifications tested (optional)

---

## 🎉 You're All Set!

Your NDIS prices will now update automatically every week. The workflow:
- ✅ Runs in the background
- ✅ Only updates when changes are detected
- ✅ Logs everything for your records
- ✅ Notifies you of updates (if configured)

No manual intervention needed! 🚀

---

## 📞 Need Help?

If you encounter issues:
1. Check the Actions tab for error logs
2. Review the Troubleshooting section above
3. Check Supabase logs for database errors
4. Verify all secrets are set correctly

**Common Fix:** Most issues are resolved by:
- Double-checking GitHub Secrets
- Re-running the workflow with "Force update" enabled
- Ensuring the database tables exist (run `create-ndis-tables.sql`)
