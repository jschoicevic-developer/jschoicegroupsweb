# Supabase Keep-Alive Workflow

This repository includes a GitHub Action workflow designed to prevent the linked Supabase project (Free Tier) from pausing due to inactivity. Supabase projects on the free tier may be paused after 7 days of inactivity. This workflow makes a lightweight read request to the database twice daily to register activity.

## How It Works

The workflow file is located at: `.github/workflows/supabase-keepalive.yml`

1.  **Schedule**: Runs automatically every 12 hours (via cron `0 */12 * * *`).
2.  **Activity**: Performs a `GET` request to the Supabase REST API (specifically specific table like `jschoice_services`).
3.  **Authentication**: Uses the project's Anon Key (safe for public/read-only access).
4.  **Reliability**: Includes retry logic (3 attempts) to handle transient network issues.

## Setup Instructions

To enable this workflow, you must add your Supabase credentials to the GitHub Repository Secrets.

### 1. Get Credentials
Go to your [Supabase Dashboard](https://supabase.com/dashboard) -> Project Settings -> API.
*   **Project URL**: `https://your-project-ref.supabase.co`
*   **Anon / Public Key**: `eyJhbGciOiJIUzI...`

### 2. Add Secrets to GitHub
1.  Navigate to your GitHub repository.
2.  Go to **Settings** > **Secrets and variables** > **Actions**.
3.  Click **New repository secret**.
4.  Add the following secrets:
    *   `SUPABASE_URL`: Your Project URL.
    *   `SUPABASE_ANON_KEY`: Your Anon Key.

### 3. (Optional) Configuration
If you want to query a different table than the default (`jschoice_services`), you can create a **Repository Variable** (same page as Secrets, but under the "Variables" tab).
*   **Name**: `KEEPALIVE_TABLE`
*   **Value**: `your_table_name`

**Note**: The chosen table must have **Row Level Security (RLS)** policies that allow public read access (Select) for the Anon key.

## Manual Testing

You can manually trigger the workflow to test your configuration:
1.  Go to the **Actions** tab in GitHub.
2.  Select **Supabase Keep-Alive** from the left sidebar.
3.  Click the **Run workflow** button.
4.  Wait for the job to complete and check the logs for "✅ Success: Supabase is active."
