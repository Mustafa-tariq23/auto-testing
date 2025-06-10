import Link from "next/link"
import { Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for vulnerabilities (replace with your actual data source)
const mockVulnerabilities = [
  { id: 1, severity: "Critical", hasPatch: false },
  { id: 2, severity: "High", hasPatch: true },
  { id: 3, severity: "Critical", hasPatch: true },
  { id: 4, severity: "Medium", hasPatch: false },
  { id: 5, severity: "Critical", hasPatch: false },
]

export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <Shield className="h-6 w-6" />
        <span className="font-bold">VulnBench</span>
      </Link>
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
          Dashboard
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative"
        >
          Vulnerabilities
          <Badge className="absolute -top-2 -right-4 h-5 w-5 flex items-center justify-center p-0 text-xs">
            {mockVulnerabilities.filter((v) => v.severity === "Critical" && !v.hasPatch).length}
          </Badge>
        </Link>
        <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          Patches
        </Link>
        <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          Analytics
        </Link>
        <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          Reports
        </Link>
      </nav>
    </div>
  )
}
