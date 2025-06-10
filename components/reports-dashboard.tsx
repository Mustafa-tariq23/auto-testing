import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "@/components/ui/chart"
import { mockVulnerabilities } from "@/lib/mock-data"
import { FileText, Download, Calendar, BarChart2 } from "lucide-react"

export function ReportsDashboard() {
  // Calculate data for reports
  const criticalCount = mockVulnerabilities.filter((v) => v.severity === "Critical").length
  const highCount = mockVulnerabilities.filter((v) => v.severity === "High").length
  const mediumCount = mockVulnerabilities.filter((v) => v.severity === "Medium").length
  const lowCount = mockVulnerabilities.filter((v) => v.severity === "Low").length

  const patchedCount = mockVulnerabilities.filter((v) => v.hasPatch).length
  const unpatchedCount = mockVulnerabilities.filter((v) => !v.hasPatch).length

  const criticalPatched = mockVulnerabilities.filter((v) => v.severity === "Critical" && v.hasPatch).length
  const criticalUnpatched = mockVulnerabilities.filter((v) => v.severity === "Critical" && !v.hasPatch).length
  const highPatched = mockVulnerabilities.filter((v) => v.severity === "High" && v.hasPatch).length
  const highUnpatched = mockVulnerabilities.filter((v) => v.severity === "High" && !v.hasPatch).length

  // Generate mock report data
  const reports = [
    {
      id: "report-001",
      name: "Monthly Vulnerability Summary",
      date: "2023-05-01",
      type: "Executive",
      description: "Monthly summary of vulnerability status for executive review",
    },
    {
      id: "report-002",
      name: "Critical Vulnerabilities Detail",
      date: "2023-05-15",
      type: "Technical",
      description: "Detailed analysis of all critical vulnerabilities",
    },
    {
      id: "report-003",
      name: "Patch Compliance Report",
      date: "2023-05-20",
      type: "Compliance",
      description: "Status of patch compliance across all systems",
    },
    {
      id: "report-004",
      name: "Vendor Security Analysis",
      date: "2023-05-25",
      type: "Analysis",
      description: "Analysis of vulnerabilities by vendor",
    },
    {
      id: "report-005",
      name: "Quarterly Security Posture",
      date: "2023-04-01",
      type: "Executive",
      description: "Quarterly review of overall security posture",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">
              {reports.filter((r) => r.type === "Executive").length} executive reports
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <BarChart2 className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalCount}</div>
            <p className="text-xs text-muted-foreground">
              {criticalPatched} patched ({Math.round((criticalPatched / criticalCount) * 100)}%)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Issues</CardTitle>
            <BarChart2 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highCount}</div>
            <p className="text-xs text-muted-foreground">
              {highPatched} patched ({Math.round((highPatched / highCount) * 100)}%)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Patch Rate</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((patchedCount / mockVulnerabilities.length) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              {patchedCount} of {mockVulnerabilities.length} vulnerabilities
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary Report</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Report</TabsTrigger>
          <TabsTrigger value="available">Available Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Vulnerability Summary Report</CardTitle>
              <CardDescription>Overview of current vulnerability status across the organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Vulnerability Severity Distribution</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Critical", value: criticalCount },
                              { name: "High", value: highCount },
                              { name: "Medium", value: mediumCount },
                              { name: "Low", value: lowCount },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#ef4444" />
                            <Cell fill="#f97316" />
                            <Cell fill="#eab308" />
                            <Cell fill="#3b82f6" />
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Patch Status by Severity</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            {
                              name: "Critical",
                              patched: criticalPatched,
                              unpatched: criticalUnpatched,
                            },
                            {
                              name: "High",
                              patched: highPatched,
                              unpatched: highUnpatched,
                            },
                            {
                              name: "Medium",
                              patched: mockVulnerabilities.filter((v) => v.severity === "Medium" && v.hasPatch).length,
                              unpatched: mockVulnerabilities.filter((v) => v.severity === "Medium" && !v.hasPatch)
                                .length,
                            },
                            {
                              name: "Low",
                              patched: mockVulnerabilities.filter((v) => v.severity === "Low" && v.hasPatch).length,
                              unpatched: mockVulnerabilities.filter((v) => v.severity === "Low" && !v.hasPatch).length,
                            },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="patched" name="Patched" stackId="a" fill="#22c55e" />
                          <Bar dataKey="unpatched" name="Unpatched" stackId="a" fill="#ef4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Key Findings</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-medium">Critical Vulnerabilities:</span> {criticalCount} identified,{" "}
                      {criticalPatched} patched ({Math.round((criticalPatched / criticalCount) * 100)}% remediation
                      rate)
                    </li>
                    <li>
                      <span className="font-medium">High Vulnerabilities:</span> {highCount} identified, {highPatched}{" "}
                      patched ({Math.round((highPatched / highCount) * 100)}% remediation rate)
                    </li>
                    <li>
                      <span className="font-medium">Overall Patch Status:</span> {patchedCount} of{" "}
                      {mockVulnerabilities.length} vulnerabilities patched (
                      {Math.round((patchedCount / mockVulnerabilities.length) * 100)}%)
                    </li>
                    <li>
                      <span className="font-medium">Top Affected Vendors:</span>{" "}
                      {Array.from(new Set(mockVulnerabilities.map((v) => v.vendor)))
                        .slice(0, 3)
                        .join(", ")}
                    </li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download Full Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Report</CardTitle>
              <CardDescription>Security compliance status across regulatory frameworks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Compliance Status</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: "PCI DSS", compliant: 85, noncompliant: 15 },
                            { name: "HIPAA", compliant: 92, noncompliant: 8 },
                            { name: "GDPR", compliant: 78, noncompliant: 22 },
                            { name: "ISO 27001", compliant: 88, noncompliant: 12 },
                            { name: "NIST CSF", compliant: 82, noncompliant: 18 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis unit="%" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="compliant" name="Compliant" stackId="a" fill="#22c55e" />
                          <Bar dataKey="noncompliant" name="Non-Compliant" stackId="a" fill="#ef4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Critical Control Status</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={[
                            { name: "Vulnerability Management", implemented: 85 },
                            { name: "Access Control", implemented: 92 },
                            { name: "Data Protection", implemented: 78 },
                            { name: "Incident Response", implemented: 88 },
                            { name: "Network Security", implemented: 82 },
                            { name: "Application Security", implemented: 75 },
                            { name: "Security Awareness", implemented: 90 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" unit="%" />
                          <YAxis dataKey="name" type="category" width={150} />
                          <Tooltip />
                          <Bar dataKey="implemented" name="Implementation %" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Compliance Findings</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-medium">Overall Compliance:</span> 85% across all frameworks
                    </li>
                    <li>
                      <span className="font-medium">Critical Findings:</span> 3 high-priority compliance gaps identified
                    </li>
                    <li>
                      <span className="font-medium">Remediation Timeline:</span> 45 days to address critical findings
                    </li>
                    <li>
                      <span className="font-medium">Most Improved Area:</span> Vulnerability Management (+15% from last
                      assessment)
                    </li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download Compliance Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Access and download previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Report Name</th>
                        <th className="p-3 text-left font-medium">Date</th>
                        <th className="p-3 text-left font-medium">Type</th>
                        <th className="p-3 text-left font-medium">Description</th>
                        <th className="p-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <tr key={report.id} className="border-b">
                          <td className="p-3 font-medium">{report.name}</td>
                          <td className="p-3">{report.date}</td>
                          <td className="p-3">
                            <Badge
                              variant="outline"
                              className={
                                report.type === "Executive"
                                  ? "border-purple-500 text-purple-500"
                                  : report.type === "Technical"
                                    ? "border-blue-500 text-blue-500"
                                    : report.type === "Compliance"
                                      ? "border-green-500 text-green-500"
                                      : "border-orange-500 text-orange-500"
                              }
                            >
                              {report.type}
                            </Badge>
                          </td>
                          <td className="p-3 max-w-[300px] truncate">{report.description}</td>
                          <td className="p-3 text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
