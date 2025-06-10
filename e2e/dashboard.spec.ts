import { test, expect } from '@playwright/test'

test.describe('Vulnerability Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the dashboard title', async ({ page }) => {
    await expect(page.getByText(/Vulnerability Dashboard/i)).toBeVisible()
  })

  test('should show vulnerability table', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
  })

  test('should display vulnerability charts', async ({ page }) => {
    await expect(page.getByTestId('vulnerability-charts')).toBeVisible()
  })

  test('should show patch management section', async ({ page }) => {
    await expect(page.getByTestId('patch-management')).toBeVisible()
  })

  test('should filter vulnerabilities', async ({ page }) => {
    // Click on severity filter
    await page.getByRole('button', { name: /severity/i }).click()
    
    // Select high severity
    await page.getByText(/high/i).click()
    
    // Verify filtered results
    const tableRows = await page.getByRole('table').locator('tr').count()
    expect(tableRows).toBeGreaterThan(1)
  })
}) 