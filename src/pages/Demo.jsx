import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";
import { 
  Users, 
  Wrench, 
  Bell, 
  Home,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowRight,
  Lock
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Demo data
const statsCards = [
  { title: "Total Residents", value: "248", icon: Users, change: "+12 this month", color: "text-primary" },
  { title: "Open Complaints", value: "23", icon: Wrench, change: "8 urgent", color: "text-amber-500" },
  { title: "Notices Published", value: "156", icon: Bell, change: "3 this week", color: "text-emerald-500" },
  { title: "Flats Registered", value: "180", icon: Home, change: "95% occupied", color: "text-info" },
];

const complaintsTrend = [
  { month: "Jan", complaints: 28, resolved: 24 },
  { month: "Feb", complaints: 35, resolved: 32 },
  { month: "Mar", complaints: 42, resolved: 38 },
  { month: "Apr", complaints: 31, resolved: 28 },
  { month: "May", complaints: 38, resolved: 35 },
  { month: "Jun", complaints: 25, resolved: 22 },
];

const complaintsByStatus = [
  { name: "Open", value: 23, color: "#F59E0B" },
  { name: "In Progress", value: 15, color: "#3B82F6" },
  { name: "Resolved", value: 178, color: "#10B981" },
];

const recentComplaints = [
  { id: "C-1024", title: "Water leakage in bathroom", flat: "A-302", status: "Open", priority: "High" },
  { id: "C-1023", title: "Lift not working properly", flat: "B-105", status: "In Progress", priority: "Medium" },
  { id: "C-1022", title: "Security camera malfunction", flat: "Common", status: "Resolved", priority: "Low" },
  { id: "C-1021", title: "Parking slot dispute", flat: "C-401", status: "Open", priority: "Medium" },
  { id: "C-1020", title: "Generator noise issue", flat: "D-202", status: "In Progress", priority: "Low" },
];

const recentNotices = [
  { title: "Monthly Maintenance Due", date: "Jan 10, 2026", type: "Payment" },
  { title: "Annual General Meeting", date: "Jan 15, 2026", type: "Meeting" },
  { title: "Water Tank Cleaning", date: "Jan 12, 2026", type: "Maintenance" },
  { title: "New Security Protocol", date: "Jan 8, 2026", type: "Announcement" },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Open":
      return <Badge variant="outline" className="border-amber-500 text-amber-500"><AlertCircle className="w-3 h-3 mr-1" />Open</Badge>;
    case "In Progress":
      return <Badge variant="outline" className="border-blue-500 text-blue-500"><Clock className="w-3 h-3 mr-1" />In Progress</Badge>;
    case "Resolved":
      return <Badge variant="outline" className="border-emerald-500 text-emerald-500"><CheckCircle2 className="w-3 h-3 mr-1" />Resolved</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const Demo = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="pt-16">
        {/* Demo Banner */}
        <motion.div
          className="bg-primary text-primary-foreground py-3 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="container mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">
              You're viewing a read-only demo dashboard. Sign in to access full controls.
            </span>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/signin">
                Sign In
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Green Valley Apartments • Demo Mode</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {statsCards.map((stat, index) => (
              <Card key={index} className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Charts Row */}
          <motion.div
            className="grid lg:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Trend Chart */}
            <Card className="lg:col-span-2 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Complaints Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={complaintsTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="complaints" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))" 
                        fillOpacity={0.2}
                        strokeWidth={2}
                        name="Received"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="resolved" 
                        stroke="hsl(var(--success))" 
                        fill="hsl(var(--success))" 
                        fillOpacity={0.2}
                        strokeWidth={2}
                        name="Resolved"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Status Pie Chart */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">By Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={complaintsByStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {complaintsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {complaintsByStatus.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tables Row */}
          <motion.div
            className="grid lg:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Recent Complaints */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Recent Complaints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentComplaints.map((complaint, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {complaint.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {complaint.id} • Flat {complaint.flat}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {getStatusBadge(complaint.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Notices */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Latest Notices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentNotices.map((notice, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {notice.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notice.date}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <Badge variant="secondary">{notice.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;