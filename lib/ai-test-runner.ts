import { GoogleGenerativeAI } from '@google/generative-ai'

export class AITestRunner {
  private genAI: GoogleGenerativeAI
  private model: any

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' })
  }

  async analyzeComponent(componentCode: string): Promise<string[]> {
    const prompt = `
      Analyze this React component code and suggest test cases that would be valuable to implement.
      Focus on:
      1. Component rendering
      2. User interactions
      3. Edge cases
      4. Accessibility
      5. Performance considerations
      
      Component code:
      ${componentCode}
    `

    const result = await this.model.generateContent(prompt)
    const response = await result.response
    const suggestions = response.text().split('\n').filter(Boolean)
    return suggestions
  }

  async generateTestCode(componentCode: string, testCases: string[]): Promise<string> {
    const prompt = `
      Generate Jest test code for these test cases for the following React component.
      Use React Testing Library and follow best practices.
      
      Component code:
      ${componentCode}
      
      Test cases to implement:
      ${testCases.join('\n')}
    `

    const result = await this.model.generateContent(prompt)
    const response = await result.response
    return response.text()
  }

  async analyzeAccessibility(componentCode: string): Promise<string[]> {
    const prompt = `
      Analyze this React component for accessibility issues and suggest improvements.
      Focus on:
      1. ARIA attributes
      2. Keyboard navigation
      3. Screen reader compatibility
      4. Color contrast
      5. Focus management
      
      Component code:
      ${componentCode}
    `

    const result = await this.model.generateContent(prompt)
    const response = await result.response
    const suggestions = response.text().split('\n').filter(Boolean)
    return suggestions
  }
} 