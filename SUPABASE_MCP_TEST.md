# Supabase MCP Connection Test Guide

After restarting Claude Code, use these test queries to verify your Supabase MCP connection is working.

## Step 1: Check MCP Server Status

First, verify the MCP server is loaded:
```
/mcp
```

You should see "supabase" listed with the `postgrestRequest` and `sqlToRest` tools.

## Step 2: Basic Connection Test

### Test 1: List Available Tables
Ask Claude:
```
What tables are available in my Supabase database?
```

Or more specifically:
```
Use the Supabase MCP to show me all tables in the public schema
```

### Test 2: Check a Specific Table Structure
```
Show me the structure of the [your-table-name] table
```

### Test 3: Simple Query (Read-Only)
```
Get the first 5 rows from the [your-table-name] table
```

Or:
```
How many records are in my database?
```

## Step 3: Test SQL Conversion Tool

Test the `sqlToRest` tool:
```
Convert this SQL to PostgREST format: SELECT * FROM users WHERE status = 'active' LIMIT 10
```

## Expected Results

✅ **Success indicators:**
- MCP server shows as "connected" in `/mcp`
- Claude can list your database tables
- You can query your data using natural language
- SQL queries get converted to REST format

❌ **If it fails:**
- Check that your `.env` file has the correct `SUPABASE_ACCESS_TOKEN`
- Verify your Supabase project URL is correct
- Ensure your access token has the necessary permissions
- Check for error messages in the Claude Code output

## Common Test Queries

Once connected, try these natural language queries:

1. **Schema exploration:**
   - "What tables exist in my database?"
   - "Show me the columns in the users table"
   - "What's the structure of my database?"

2. **Data queries:**
   - "Show me the last 10 records from [table-name]"
   - "How many rows are in [table-name]?"
   - "Find all records where [condition]"

3. **Filtered queries:**
   - "Get all users created in the last 7 days"
   - "Show me records where status is 'active'"
   - "List items sorted by created_at"

## Security Note

Your Supabase access token is stored in `.env` which is in `.gitignore`.
Never commit your `.env` file or share your access token publicly.

## Next Steps

After confirming the connection works:
1. Use natural language to query your database
2. Build features that interact with your Supabase data
3. Let Claude help you with CRUD operations on your database

---

**Quick start after restart:**
```bash
claude
```

Then simply ask:
```
Show me what's in my Supabase database
```
