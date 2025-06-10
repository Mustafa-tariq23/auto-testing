import { AITestRunner } from '../lib/ai-test-runner'
import fs from 'fs'
import path from 'path'

async function runAITests() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('GEMINI_API_KEY environment variable is required')
    process.exit(1)
  }

  const testRunner = new AITestRunner(apiKey)
  const componentsDir = path.join(process.cwd(), 'components')
  const testResults: { [key: string]: any } = {}

  // Get all component files
  const componentFiles = fs.readdirSync(componentsDir)
    .filter(file => file.endsWith('.tsx') && !file.endsWith('.test.tsx'))

  for (const file of componentFiles) {
    console.log(`Analyzing component: ${file}`)
    const componentPath = path.join(componentsDir, file)
    const componentCode = fs.readFileSync(componentPath, 'utf-8')

    try {
      // Analyze component and generate test cases
      const testCases = await testRunner.analyzeComponent(componentCode)
      console.log(`Generated ${testCases.length} test cases for ${file}`)

      // Generate test code
      const testCode = await testRunner.generateTestCode(componentCode, testCases)
      
      // Analyze accessibility
      const accessibilityIssues = await testRunner.analyzeAccessibility(componentCode)

      testResults[file] = {
        testCases,
        testCode,
        accessibilityIssues,
      }

      // Write test file
      const testFilePath = path.join(componentsDir, '__tests__', `${file.replace('.tsx', '')}.ai.test.tsx`)
      fs.writeFileSync(testFilePath, testCode)
      console.log(`Written test file: ${testFilePath}`)

    } catch (error) {
      console.error(`Error analyzing ${file}:`, error)
    }
  }

  // Write summary report
  const reportPath = path.join(process.cwd(), 'ai-test-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2))
  console.log(`Test report written to: ${reportPath}`)
}

runAITests().catch(console.error) 