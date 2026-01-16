import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Building2, Users, FileText, Wrench, LogOut, Bell, UserCheck, TrendingUp, AlertCircle, CheckCircle2, Clock, Plus } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardAPI, complaintAPI, noticeAPI, userAPI } from '../services/api';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNoticeDialog, setShowNoticeDialog] = useState(false);
  const [noticeFormData, setNoticeFormData] = useState({ title: '', content: '' });
  const [isCreatingNotice, setIsCreatingNotice] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, complaintsRes, noticesRes, pendingRes] = await Promise.all([
        dashboardAPI.getAdminStats(),
        complaintAPI.getAll(),
        noticeAPI.getAll(),
        userAPI.getPending()
      ]);

      setStats(statsRes.data);
      setComplaints(complaintsRes.data);
      setNotices(noticesRes.data);
      setPendingUsers(pendingRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleApproveUser = async (userId) => {
    try {
      await userAPI.approve(userId);
      fetchDashboardData();
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleUpdateComplaintStatus = async (complaintId, status) => {
    try {
      await complaintAPI.updateStatus(complaintId, status);
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    setIsCreatingNotice(true);

    try {
      await noticeAPI.create(noticeFormData);
      setNoticeFormData({ title: '', content: '' });
      setShowNoticeDialog(false);
      fetchDashboardData();
      alert('Notice published successfully!');
    } catch (error) {
      console.error('Error creating notice:', error);
      alert('Failed to publish notice. Please try again.');
    } finally {
      setIsCreatingNotice(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-primary text-xl">Loading dashboard...</div>
      </div>
    );
  }

  const COLORS = ['#0D9488', '#FB923C', '#EF4444'];

  const statusData = [
    { name: 'Open', value: stats?.openComplaints || 0 },
    { name: 'In Progress', value: stats?.inProgressComplaints || 0 },
    { name: 'Resolved', value: stats?.resolvedComplaints || 0 }
  ];

  const categoryData = Object.entries(stats?.complaintsByCategory || {}).map(([key, value]) => ({
    name: key,
    count: value
  }));

  const statsCards = [
    { title: "Total Residents", value: stats?.totalResidents || 0, icon: Users, change: "Active users", color: "text-primary", bg: "bg-primary/10" },
    { title: "Open Complaints", value: stats?.openComplaints || 0, icon: Wrench, change: "Needs attention", color: "text-amber-500", bg: "bg-amber-100" },
    { title: "Total Notices", value: stats?.totalNotices || 0, icon: FileText, change: "Published", color: "text-emerald-500", bg: "bg-emerald-100" },
    { title: "Pending Approvals", value: pendingUsers.length, icon: UserCheck, change: "Awaiting review", color: "text-info", bg: "bg-blue-100" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "OPEN":
        return <Badge variant="outline" className="border-amber-500 text-amber-500"><AlertCircle className="w-3 h-3 mr-1" />Open</Badge>;
      case "IN_PROGRESS":
        return <Badge variant="outline" className="border-blue-500 text-blue-500"><Clock className="w-3 h-3 mr-1" />In Progress</Badge>;
      case "RESOLVED":
        return <Badge variant="outline" className="border-emerald-500 text-emerald-500"><CheckCircle2 className="w-3 h-3 mr-1" />Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Navbar */}
      <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {localStorage.getItem('userEmail')}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header with Create Notice Button */}
        <motion.div
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-1">Manage your society operations</p>
          </div>

          {/* Create Notice Dialog */}
          <Dialog open={showNoticeDialog} onOpenChange={setShowNoticeDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Publish Notice
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Publish New Notice</DialogTitle>
                <DialogDescription>
                  Create a notice that will be visible to all residents.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateNotice} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="notice-title">Title *</Label>
                  <Input
                    id="notice-title"
                    value={noticeFormData.title}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, title: e.target.value })}
                    placeholder="e.g., Annual General Meeting"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notice-content">Content *</Label>
                  <Textarea
                    id="notice-content"
                    value={noticeFormData.content}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, content: e.target.value })}
                    placeholder="Write the notice details here..."
                    rows={5}
                    required
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNoticeDialog(false)}
                    disabled={isCreatingNotice}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreatingNotice}>
                    {isCreatingNotice ? 'Publishing...' : 'Publish Notice'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
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
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Charts */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Pie Chart */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Complaints by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Complaints by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pending Users */}
        {pendingUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-border mb-8">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-500" />
                  Pending User Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <div>
                        <div className="font-semibold text-foreground">{user.fullName}</div>
                        <div className="text-sm text-muted-foreground">{user.email} • {user.phoneNumber}</div>
                      </div>
                      <Button onClick={() => handleApproveUser(user.id)} size="sm">
                        Approve
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Recent Complaints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-border mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Recent Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {complaints.slice(0, 5).map(complaint => (
                  <div key={complaint.id} className="flex items-start justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">{complaint.title}</span>
                        {getStatusBadge(complaint.status)}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">{complaint.description}</div>
                      <div className="text-xs text-muted-foreground">Category: {complaint.category}</div>
                    </div>
                    {complaint.status !== 'RESOLVED' && (
                      <select
                        value={complaint.status}
                        onChange={(e) => handleUpdateComplaintStatus(complaint.id, e.target.value)}
                        className="ml-4 px-3 py-2 border border-border rounded-lg text-sm bg-card hover:bg-muted transition-colors"
                      >
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Notices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Recent Notices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notices.slice(0, 5).map(notice => (
                  <div key={notice.id} className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div className="font-semibold text-foreground mb-1">{notice.title}</div>
                    <div className="text-sm text-muted-foreground mb-2">{notice.content}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;