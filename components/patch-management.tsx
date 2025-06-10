import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DownloadIcon, CheckCircle, Clock } from "lucide-react"
import { mockVulnerabilities } from "@/lib/mock-data"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PatchManagement() {
  // Get all patches from vulnerabilities
  const patches = mockVulnerabilities
    .filter((v) => v.hasPatch)
    .map((v) => ({
      id: v.patchId || `PATCH-${v.id}`,
      cveId: v.cveId,
      version: v.patchVersion || "1.0.0",
      releaseDate: v.patchReleaseDate || "2023-01-01",
      severity: v.severity,
      vendor: v.vendor,
      status: Math.random() > 0.3 ? "Deployed" : Math.random() > 0.5 ? "Pending" : "Testing",
      deploymentProgress: Math.floor(Math.random() * 100),
      description: `Patch for ${v.description.toLowerCase()}`,
      affectedSystems: v.affectedSystems,
    }))

  const deployedPatches = patches.filter((p) => p.status === "Deployed")
  const pendingPatches = patches.filter((p) => p.status === "Pending" || p.status === "Testing")

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Patches</CardTitle>
            <DownloadIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patches.length}</div>
            <p className="text-xs text-muted-foreground">
              For {mockVulnerabilities.filter((v) => v.hasPatch).length} vulnerabilities
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployed Patches</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deployedPatches.length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((deployedPatches.length / patches.length) * 100)}% of available patches
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Patches</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPatches.length}</div>
            <p className="text-xs text-muted-foreground">
              {pendingPatches.filter((p) => p.status === "Testing").length} in testing
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Patches</TabsTrigger>
          <TabsTrigger value="deployed">Deployed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <PatchTable patches={patches} />
        </TabsContent>

        <TabsContent value="deployed">
          <PatchTable patches={deployedPatches} />
        </TabsContent>

        <TabsContent value="pending">
          <PatchTable patches={pendingPatches} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PatchTable({ patches }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Patch ID</TableHead>
            <TableHead className="w-[120px]">CVE ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[100px]">Severity</TableHead>
            <TableHead className="w-[120px]">Vendor</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[150px]">Deployment</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patches.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No patches found.
              </TableCell>
            </TableRow>
          ) : (
            patches.map((patch) => (
              <TableRow key={patch.id}>
                <TableCell className="font-medium">{patch.id}</TableCell>
                <TableCell>{patch.cveId}</TableCell>
                <TableCell className="max-w-[300px] truncate">{patch.description}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      patch.severity === "Critical"
                        ? "bg-red-500"
                        : patch.severity === "High"
                          ? "bg-orange-500"
                          : patch.severity === "Medium"
                            ? "bg-yellow-500 text-black"
                            : "bg-blue-500"
                    }
                  >
                    {patch.severity}
                  </Badge>
                </TableCell>
                <TableCell>{patch.vendor}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      patch.status === "Deployed"
                        ? "border-green-500 text-green-500"
                        : patch.status === "Testing"
                          ? "border-blue-500 text-blue-500"
                          : "border-orange-500 text-orange-500"
                    }
                  >
                    {patch.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Progress value={patch.deploymentProgress} className="h-2" />
                    <span className="text-xs">{patch.deploymentProgress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
