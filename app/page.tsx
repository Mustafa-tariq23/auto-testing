import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { VulnerabilityDashboard } from "@/components/vulnerability-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VulnerabilityTable } from "@/components/vulnerability-table"
import { mockVulnerabilities } from "@/lib/mock-data"
import { PatchManagement } from "@/components/patch-management"
import { ReportsDashboard } from "@/components/reports-dashboard"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Vulnerability Management System"
        text="Monitor, analyze, and manage security vulnerabilities across your organization."
      />

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="patches">Patches</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <VulnerabilityDashboard />
        </TabsContent>

        <TabsContent value="vulnerabilities">
          <div className="space-y-4">
            <DashboardHeader heading="Vulnerabilities" text="View and manage all detected vulnerabilities." />
            <VulnerabilityTable vulnerabilities={mockVulnerabilities} />
          </div>
        </TabsContent>

        <TabsContent value="patches">
          <PatchManagement />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsDashboard />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
