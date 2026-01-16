import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Building2, LogOut, Plus, AlertCircle, X, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { complaintAPI, noticeAPI, userAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const ResidentDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);
  const [user, setUser] = useState(null);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    category: 'Plumbing',
    title: '',
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [myComplaintsRes, noticesRes, userRes] = await Promise.all([
        complaintAPI.getMy(),
        noticeAPI.getAll(),
        userAPI.getMe()
      ]);

      setComplaints(myComplaintsRes.data);
      setNotices(noticesRes.data);
      setUser(userRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    try {
      await complaintAPI.create(formData);
      setFormData({ category: 'Plumbing', title: '', description: '' });
      setShowComplaintForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating complaint:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-primary text-xl">Loading dashboard...</div>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Open Complaints",
      value: complaints.filter(c => c.status === 'OPEN').length,
      change: "Pending review",
      color: "text-amber-500",
      bg: "bg-amber-100"
    },
    {
      title: "In Progress",
      value: complaints.filter(c => c.status === 'IN_PROGRESS').length,
      change: "Being resolved",
      color: "text-blue-500",
      bg: "bg-blue-100"
    },
    {
      title: "Resolved",
      value: complaints.filter(c => c.status === 'RESOLVED').length,
      change: "Completed",
      color: "text-emerald-500",
      bg: "bg-emerald-100"
    },
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
              <span className="text-xl font-bold text-foreground">Resident Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {user?.fullName} • {user?.flat?.flatNumber}
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
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your complaints and view society updates</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
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
                    <div className={`w-3 h-3 rounded-full ${stat.color.replace('text-', 'bg-')}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* My Complaints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-border mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">My Complaints</CardTitle>
                <Button onClick={() => setShowComplaintForm(!showComplaintForm)} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Raise Complaint
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Complaint Form */}
              <AnimatePresence>
                {showComplaintForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleSubmitComplaint}
                    className="mb-6 p-4 bg-muted/50 rounded-lg border border-border"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">New Complaint</h3>
                      <button
                        type="button"
                        onClick={() => setShowComplaintForm(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        >
                          <option value="Plumbing">Plumbing</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Cleaning">Cleaning</option>
                          <option value="Security">Security</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Brief title"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the issue in detail"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button type="submit">Submit Complaint</Button>
                      <Button type="button" variant="outline" onClick={() => setShowComplaintForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Complaints List */}
              <div className="space-y-3">
                {complaints.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No complaints raised yet</p>
                  </div>
                ) : (
                  complaints.map(complaint => (
                    <div key={complaint.id} className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{complaint.title}</span>
                            {getStatusBadge(complaint.status)}
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">{complaint.description}</div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>Category: {complaint.category}</span>
                            <span>•</span>
                            <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Society Notices</CardTitle>
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

export default ResidentDashboard;