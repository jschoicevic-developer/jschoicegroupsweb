/**
 * CRM Backend Test Script
 * Tests all API endpoints and functionality
 * 
 * Run: node test-crm-backend.js
 */

const BASE_URL = 'https://jschoice-website.vercel.app';

// Color codes for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
    log(`✅ ${message}`, 'green');
}

function logError(message) {
    log(`❌ ${message}`, 'red');
}

function logInfo(message) {
    log(`ℹ️  ${message}`, 'cyan');
}

function logWarning(message) {
    log(`⚠️  ${message}`, 'yellow');
}

// Test results tracker
const results = {
    passed: 0,
    failed: 0,
    tests: [],
};

async function runTest(name, testFn) {
    try {
        log(`\n🧪 Testing: ${name}`, 'blue');
        await testFn();
        logSuccess(`PASSED: ${name}`);
        results.passed++;
        results.tests.push({ name, status: 'PASSED' });
    } catch (error) {
        logError(`FAILED: ${name}`);
        logError(`Error: ${error.message}`);
        results.failed++;
        results.tests.push({ name, status: 'FAILED', error: error.message });
    }
}

// ============================================================================
// TEST 1: Create Lead (PUBLIC)
// ============================================================================
async function testCreateLead() {
    const response = await fetch(`${BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            first_name: 'Test',
            last_name: 'User',
            email: 'test@example.com',
            phone: '0400123456',
            source: 'contact_form',
            message: 'This is a test lead from automated testing',
            location: 'Point Cook',
            state: 'VIC',
            ndis_participant: true,
            ndis_status: 'funded',
            interested_services: ['daily-life', 'nursing'],
            utm_source: 'test',
            utm_medium: 'automated',
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    if (!data.success || !data.data || !data.data.id) {
        throw new Error('Invalid response structure');
    }

    logInfo(`Lead created with ID: ${data.data.id}`);

    // Store for later tests
    global.testLeadId = data.data.id;

    return data.data;
}

// ============================================================================
// TEST 2: List Leads
// ============================================================================
async function testListLeads() {
    const response = await fetch(`${BASE_URL}/api/leads?page=1&limit=10`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    if (!data.success || !Array.isArray(data.data)) {
        throw new Error('Invalid response structure');
    }

    logInfo(`Found ${data.data.length} leads (Total: ${data.pagination.total})`);

    return data;
}

// ============================================================================
// TEST 3: Get Single Lead
// ============================================================================
async function testGetSingleLead() {
    if (!global.testLeadId) {
        throw new Error('No test lead ID available');
    }

    const response = await fetch(`${BASE_URL}/api/leads/${global.testLeadId}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    if (!data.success || !data.data) {
        throw new Error('Invalid response structure');
    }

    logInfo(`Retrieved lead: ${data.data.first_name} ${data.data.last_name}`);

    return data.data;
}

// ============================================================================
// TEST 4: Update Lead
// ============================================================================
async function testUpdateLead() {
    if (!global.testLeadId) {
        throw new Error('No test lead ID available');
    }

    const response = await fetch(`${BASE_URL}/api/leads/${global.testLeadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: 'contacted',
            priority: 'high',
            internal_notes: 'Updated via automated test',
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    if (!data.success || data.data.status !== 'contacted') {
        throw new Error('Lead not updated correctly');
    }

    logInfo(`Lead status updated to: ${data.data.status}`);

    return data.data;
}

// ============================================================================
// TEST 5: Create Activity
// ============================================================================
async function testCreateActivity() {
    if (!global.testLeadId) {
        throw new Error('No test lead ID available');
    }

    const response = await fetch(`${BASE_URL}/api/leads/${global.testLeadId}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            activity_type: 'note_added',
            title: 'Test Note',
            description: 'This is a test activity from automated testing',
            created_by_name: 'Test Script',
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    if (!data.success || !data.data) {
        throw new Error('Invalid response structure');
    }

    logInfo(`Activity created: ${data.data.title}`);

    return data.data;
}

// ============================================================================
// TEST 6: Get Activities
// ============================================================================
async function testGetActivities() {
    if (!global.testLeadId) {
        throw new Error('No test lead ID available');
    }

    const response = await fetch(`${BASE_URL}/api/leads/${global.testLeadId}/activities`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    if (!data.success || !Array.isArray(data.data)) {
        throw new Error('Invalid response structure');
    }

    logInfo(`Found ${data.data.length} activities`);

    return data.data;
}

// ============================================================================
// TEST 7: Create Task
// ============================================================================
async function testCreateTask() {
    if (!global.testLeadId) {
        throw new Error('No test lead ID available');
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dueDate = tomorrow.toISOString().split('T')[0];

    const response = await fetch(`${BASE_URL}/api/leads/${global.testLeadId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'Follow up call',
            description: 'Call to discuss NDIS services',
            task_type: 'call',
            due_date: dueDate,
            priority: 'high',
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    if (!data.success || !data.data) {
        throw new Error('Invalid response structure');
    }

    logInfo(`Task created: ${data.data.title} (Due: ${data.data.due_date})`);

    global.testTaskId = data.data.id;

    return data.data;
}

// ============================================================================
// TEST 8: Get Tasks
// ============================================================================
async function testGetTasks() {
    if (!global.testLeadId) {
        throw new Error('No test lead ID available');
    }

    const response = await fetch(`${BASE_URL}/api/leads/${global.testLeadId}/tasks`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    if (!data.success || !Array.isArray(data.data)) {
        throw new Error('Invalid response structure');
    }

    logInfo(`Found ${data.data.length} tasks`);

    return data.data;
}

// ============================================================================
// TEST 9: Complete Task
// ============================================================================
async function testCompleteTask() {
    if (!global.testTaskId) {
        throw new Error('No test task ID available');
    }

    const response = await fetch(`${BASE_URL}/api/tasks/${global.testTaskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            is_completed: true,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    if (!data.success || !data.data.is_completed) {
        throw new Error('Task not marked as completed');
    }

    logInfo(`Task completed: ${data.data.title}`);

    return data.data;
}

// ============================================================================
// TEST 10: List Blog Posts
// ============================================================================
async function testListBlogPosts() {
    const response = await fetch(`${BASE_URL}/api/blog?page=1&limit=10`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    if (!data.success || !Array.isArray(data.data)) {
        throw new Error('Invalid response structure');
    }

    logInfo(`Found ${data.data.length} blog posts`);

    return data;
}

// ============================================================================
// TEST 11: Get Blog Categories
// ============================================================================
async function testGetBlogCategories() {
    const response = await fetch(`${BASE_URL}/api/blog/categories`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    if (!data.success || !Array.isArray(data.data)) {
        throw new Error('Invalid response structure');
    }

    logInfo(`Found ${data.data.length} categories`);
    data.data.forEach(cat => logInfo(`  - ${cat.name} (${cat.slug})`));

    return data.data;
}

// ============================================================================
// TEST 12: Analytics - Overview
// ============================================================================
async function testAnalyticsOverview() {
    const response = await fetch(`${BASE_URL}/api/analytics/overview`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    if (!data.success || !data.data) {
        throw new Error('Invalid response structure');
    }

    logInfo(`Total leads: ${data.data.leads.total}`);
    logInfo(`New leads: ${data.data.leads.new}`);
    logInfo(`Published posts: ${data.data.blog.published}`);

    return data.data;
}

// ============================================================================
// TEST 13: Analytics - Leads
// ============================================================================
async function testAnalyticsLeads() {
    const response = await fetch(`${BASE_URL}/api/analytics/leads?days=30`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
    }

    if (!data.success || !data.data) {
        throw new Error('Invalid response structure');
    }

    logInfo(`Conversion rate: ${data.data.summary.conversionRate}%`);
    logInfo(`Total leads: ${data.data.summary.total}`);

    return data.data;
}

// ============================================================================
// MAIN TEST RUNNER
// ============================================================================
async function runAllTests() {
    log('\n' + '='.repeat(70), 'cyan');
    log('🚀 JS CHOICE CRM BACKEND TEST SUITE', 'cyan');
    log('='.repeat(70) + '\n', 'cyan');

    // Lead Management Tests
    log('\n📋 LEAD MANAGEMENT TESTS', 'yellow');
    log('─'.repeat(70), 'yellow');
    await runTest('Create Lead (PUBLIC)', testCreateLead);
    await runTest('List Leads', testListLeads);
    await runTest('Get Single Lead', testGetSingleLead);
    await runTest('Update Lead', testUpdateLead);

    // Activity Tests
    log('\n📝 ACTIVITY TESTS', 'yellow');
    log('─'.repeat(70), 'yellow');
    await runTest('Create Activity', testCreateActivity);
    await runTest('Get Activities', testGetActivities);

    // Task Tests
    log('\n✅ TASK TESTS', 'yellow');
    log('─'.repeat(70), 'yellow');
    await runTest('Create Task', testCreateTask);
    await runTest('Get Tasks', testGetTasks);
    await runTest('Complete Task', testCompleteTask);

    // Blog Tests
    log('\n📰 BLOG TESTS', 'yellow');
    log('─'.repeat(70), 'yellow');
    await runTest('List Blog Posts', testListBlogPosts);
    await runTest('Get Blog Categories', testGetBlogCategories);

    // Analytics Tests
    log('\n📊 ANALYTICS TESTS', 'yellow');
    log('─'.repeat(70), 'yellow');
    await runTest('Analytics - Overview', testAnalyticsOverview);
    await runTest('Analytics - Leads', testAnalyticsLeads);

    // Print Summary
    log('\n' + '='.repeat(70), 'cyan');
    log('📊 TEST SUMMARY', 'cyan');
    log('='.repeat(70), 'cyan');

    log(`\nTotal Tests: ${results.passed + results.failed}`);
    logSuccess(`Passed: ${results.passed}`);
    if (results.failed > 0) {
        logError(`Failed: ${results.failed}`);
    }

    const successRate = ((results.passed / (results.passed + results.failed)) * 100).toFixed(1);
    log(`\nSuccess Rate: ${successRate}%`, successRate === '100.0' ? 'green' : 'yellow');

    // Print failed tests
    if (results.failed > 0) {
        log('\n❌ FAILED TESTS:', 'red');
        results.tests
            .filter(t => t.status === 'FAILED')
            .forEach(t => {
                logError(`  - ${t.name}`);
                logError(`    ${t.error}`);
            });
    }

    log('\n' + '='.repeat(70) + '\n', 'cyan');

    // Exit with appropriate code
    process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch(error => {
    logError(`\nFatal error: ${error.message}`);
    process.exit(1);
});
