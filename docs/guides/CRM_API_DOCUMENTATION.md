# JS CHOICE CRM - API DOCUMENTATION

Complete API reference for the CRM backend.

---

## Authentication

All `/admin` routes and most API endpoints require authentication via Supabase Auth.

**Auth Flow:**
- User logs in via Supabase Auth
- Session cookie is set automatically
- Middleware protects `/admin` routes
- API routes use service role key server-side

**Important:** This is a single-user system. If authenticated → full access.

---

## API Endpoints

### **LEADS API**

#### `POST /api/leads`
Create new lead (PUBLIC - from website forms)

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Smith",
  "email": "john@example.com",
  "phone": "0400123456",
  "message": "Interested in support services",
  "source": "contact_form",
  "source_page": "/contact-us",
  "ndis_participant": true,
  "ndis_status": "funded",
  "location": "Point Cook",
  "interested_services": ["daily-life", "nursing"],
  "utm_source": "google",
  "utm_medium": "cpc"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* Lead object */ },
  "message": "Lead created successfully"
}
```

---

#### `GET /api/leads`
List leads with filters (AUTHENTICATED)

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `status` - Filter by status (new, contacted, qualified, etc.)
- `source` - Filter by source (contact_form, service_matcher, etc.)
- `search` - Search by name, email, or phone
- `assigned` - Filter by assigned user ID (or "unassigned")
- `priority` - Filter by priority (low, normal, high, urgent)
- `dateFrom` - Filter from date (ISO format)
- `dateTo` - Filter to date (ISO format)

**Response:**
```json
{
  "success": true,
  "data": [ /* Array of leads */ ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

---

#### `GET /api/leads/[id]`
Get single lead (AUTHENTICATED)

**Response:**
```json
{
  "success": true,
  "data": { /* Lead object */ }
}
```

---

#### `PUT /api/leads/[id]`
Update lead (AUTHENTICATED)

**Request Body:** (all fields optional)
```json
{
  "status": "contacted",
  "priority": "high",
  "assigned_to": "user-uuid",
  "internal_notes": "Called and left voicemail",
  "next_followup_date": "2026-02-10",
  "next_followup_note": "Call back next week"
}
```

---

#### `DELETE /api/leads/[id]`
Delete lead (AUTHENTICATED)

---

#### `GET /api/leads/export`
Export leads to CSV (AUTHENTICATED)

**Query Parameters:** Same filters as GET /api/leads

**Response:** CSV file download

---

### **LEAD ACTIVITIES API**

#### `GET /api/leads/[id]/activities`
Get all activities for a lead (AUTHENTICATED)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "lead_id": "uuid",
      "activity_type": "status_changed",
      "title": "Status changed",
      "old_value": "new",
      "new_value": "contacted",
      "created_at": "2026-02-07T10:00:00Z"
    }
  ]
}
```

---

#### `POST /api/leads/[id]/activities`
Add activity to lead (AUTHENTICATED)

**Request Body:**
```json
{
  "activity_type": "note_added",
  "title": "Called client",
  "description": "Discussed service options",
  "created_by_name": "Admin"
}
```

---

### **LEAD TASKS API**

#### `GET /api/leads/[id]/tasks`
Get tasks for a lead (AUTHENTICATED)

**Query Parameters:**
- `includeCompleted` - Include completed tasks (default: false)

---

#### `POST /api/leads/[id]/tasks`
Create task for lead (AUTHENTICATED)

**Request Body:**
```json
{
  "title": "Follow up call",
  "description": "Discuss NDIS plan",
  "task_type": "call",
  "due_date": "2026-02-10",
  "due_time": "14:00",
  "priority": "high"
}
```

---

#### `PUT /api/tasks/[taskId]`
Update task (AUTHENTICATED)

---

#### `PATCH /api/tasks/[taskId]`
Mark task complete/incomplete (AUTHENTICATED)

**Request Body:**
```json
{
  "is_completed": true
}
```

---

#### `DELETE /api/tasks/[taskId]`
Delete task (AUTHENTICATED)

---

### **BLOG API**

#### `GET /api/blog`
List blog posts

**Query Parameters:**
- `admin` - Set to "true" to see all posts (requires auth)
- `page` - Page number
- `limit` - Items per page
- `category` - Filter by category slug
- `status` - Filter by status (admin only)
- `search` - Search in title and excerpt

**Public:** Only published posts
**Admin:** All posts with filters

---

#### `POST /api/blog`
Create blog post (AUTHENTICATED)

**Request Body:**
```json
{
  "title": "Understanding NDIS Support Coordination",
  "slug": "understanding-ndis-support-coordination",
  "content": "<p>Full HTML content...</p>",
  "excerpt": "Brief summary",
  "category": "ndis-news",
  "tags": ["ndis", "support"],
  "featured_image": "https://...",
  "meta_title": "SEO title",
  "meta_description": "SEO description",
  "status": "draft",
  "author_name": "JS Choice Team"
}
```

**Status Options:**
- `draft` - Save as draft
- `published` - Publish immediately
- `scheduled` - Schedule for later (requires `scheduled_for` field)

---

#### `GET /api/blog/[slug]`
Get single blog post

**Query Parameters:**
- `admin` - Set to "true" to bypass published check

**Public:** Only if published
**Admin:** Any status

---

#### `PUT /api/blog/[slug]`
Update blog post (AUTHENTICATED)

---

#### `DELETE /api/blog/[slug]`
Delete blog post (AUTHENTICATED)

---

#### `GET /api/blog/categories`
List all categories (PUBLIC)

---

#### `POST /api/blog/categories`
Create category (AUTHENTICATED)

---

#### `GET /api/blog/scheduler`
Auto-publish scheduled posts (CRON JOB)

This endpoint is called automatically by Vercel Cron every hour.

---

### **ANALYTICS API**

#### `GET /api/analytics/leads`
Lead analytics and trends (AUTHENTICATED)

**Query Parameters:**
- `days` - Number of days to analyze (default: 30)

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total": 150,
      "new": 25,
      "contacted": 40,
      "qualified": 30,
      "won": 20,
      "lost": 10,
      "conversionRate": 13.33
    },
    "byStatus": { "new": 25, "contacted": 40, ... },
    "bySource": { "contact_form": 80, "service_matcher": 70 },
    "byPriority": { "normal": 100, "high": 50 },
    "trends": {
      "leads": { "2026-02-01": 5, "2026-02-02": 8, ... },
      "activity": { "2026-02-01": 12, ... }
    }
  }
}
```

---

#### `GET /api/analytics/overview`
Dashboard overview stats (AUTHENTICATED)

**Response:**
```json
{
  "success": true,
  "data": {
    "leads": {
      "total": 150,
      "new": 25,
      "qualified": 30,
      "won": 20,
      "today": 3,
      "thisWeek": 15,
      "thisMonth": 45
    },
    "blog": {
      "total": 50,
      "published": 40,
      "draft": 8,
      "scheduled": 2
    },
    "tasks": {
      "pending": 12,
      "overdue": 3,
      "today": 5
    },
    "recent": {
      "leads": [ /* Recent leads */ ],
      "activities": [ /* Recent activities */ ]
    }
  }
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad request (validation error)
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding for production.

---

## CORS

CORS is configured to allow requests from your domain only.

---

## Testing

Use tools like:
- **Postman** - API testing
- **Thunder Client** (VS Code) - API testing
- **curl** - Command line testing

Example curl:
```bash
curl -X POST https://jschoicegroup.com.au/api/leads \
  -H "Content-Type: application/json" \
  -d '{"first_name":"John","email":"john@example.com","source":"contact_form"}'
```

---

## Security Notes

1. **Service Role Key** - NEVER expose to client
2. **RLS Policies** - Enabled on all tables
3. **Input Validation** - All inputs validated server-side
4. **Email Sanitization** - Emails lowercased and trimmed
5. **Auth Required** - All admin endpoints protected

---

**END OF API DOCUMENTATION**
