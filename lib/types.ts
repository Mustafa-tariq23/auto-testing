export interface Vulnerability {
  id: string
  cveId: string
  description: string
  severity: "Critical" | "High" | "Medium" | "Low"
  vendor: string
  hasPatch: boolean
  patchId?: string
  patchVersion?: string
  patchReleaseDate?: string
  affectedSystems: string[]
  cvssScore?: number
  discoveryDate?: string
}

export interface Patch {
  patchId: string
  version: string
  remediationSteps: string
  downloadUrl: string
  isAvailable: boolean
}
