import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Upload, Save, X, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';

interface BoardMember {
  id: string;
  name: string;
  nameNepali: string;
  position: string;
  positionNepali: string;
  email: string;
  phone: string;
  bio: string;
  bioNepali: string;
  photo: string;
  category: 'board' | 'management' | 'staff';
  featured: boolean;
  joinDate: string;
}

const BoardAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<Partial<BoardMember>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'board', label: 'Board Members' },
    { value: 'management', label: 'Management Team' },
    { value: 'staff', label: 'Staff Members' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in production, use proper auth
    if (credentials.username === 'admin' && credentials.password === 'maitree2024') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSave = () => {
    if (!currentMember.name || !currentMember.position) {
      alert('Please fill in required fields (Name and Position)');
      return;
    }

    const member: BoardMember = {
      id: currentMember.id || Date.now().toString(),
      name: currentMember.name || '',
      nameNepali: currentMember.nameNepali || '',
      position: currentMember.position || '',
      positionNepali: currentMember.positionNepali || '',
      email: currentMember.email || '',
      phone: currentMember.phone || '',
      bio: currentMember.bio || '',
      bioNepali: currentMember.bioNepali || '',
      photo: currentMember.photo || '/images/placeholder-avatar.jpg',
      category: (currentMember.category as 'board' | 'management' | 'staff') || 'board',
      featured: currentMember.featured || false,
      joinDate: currentMember.joinDate || new Date().toISOString().split('T')[0]
    };

    let updatedMembers;
    if (isEditing) {
      updatedMembers = members.map(item => item.id === member.id ? member : item);
    } else {
      updatedMembers = [...members, member];
    }

    setMembers(updatedMembers);
    localStorage.setItem('maitree_board_members', JSON.stringify(updatedMembers));

    setCurrentMember({});
    setIsEditing(false);
    alert('Board member saved successfully!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      const updatedMembers = members.filter(item => item.id !== id);
      setMembers(updatedMembers);
      localStorage.setItem('maitree_board_members', JSON.stringify(updatedMembers));
    }
  };

  const handleEdit = (member: BoardMember) => {
    setCurrentMember(member);
    setIsEditing(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoData = event.target?.result as string;
        setCurrentMember({...currentMember, photo: photoData});
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredMembers = selectedCategory === 'all' 
    ? members 
    : members.filter(member => member.category === selectedCategory);

  useEffect(() => {
    // Load saved members from localStorage
    const savedMembers = localStorage.getItem('maitree_board_members');
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    } else {
      // Load default members if none exist
      const defaultMembers: BoardMember[] = [
        {
          id: '1',
          name: 'Ram Bahadur Sharma',
          nameNepali: 'राम बहादुर शर्मा',
          position: 'Chairman',
          positionNepali: 'अध्यक्ष',
          email: 'chairman@maitriecoop.com',
          phone: '9841234567',
          bio: 'Experienced leader with 15+ years in cooperative sector.',
          bioNepali: 'सहकारी क्षेत्रमा १५+ वर्षको अनुभव भएका अनुभवी नेता।',
          photo: '/images/placeholder-avatar.jpg',
          category: 'board',
          featured: true,
          joinDate: '2020-01-15'
        },
        {
          id: '2',
          name: 'Sita Devi Poudel',
          nameNepali: 'सीता देवी पौडेल',
          position: 'Vice Chairman',
          positionNepali: 'उपाध्यक्ष',
          email: 'vice.chairman@maitriecoop.com',
          phone: '9851234567',
          bio: 'Women empowerment advocate and financial expert.',
          bioNepali: 'महिला सशक्तिकरणका वकालत गर्ने र वित्तीय विशेषज्ञ।',
          photo: '/images/placeholder-avatar.jpg',
          category: 'board',
          featured: true,
          joinDate: '2020-01-15'
        }
      ];
      setMembers(defaultMembers);
      localStorage.setItem('maitree_board_members', JSON.stringify(defaultMembers));
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              <div className="text-green-600 text-2xl font-bold mb-2">Maitree Cooperative</div>
              <div className="text-lg">Board Admin Panel</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login to Admin Panel
              </Button>
              <div className="text-xs text-gray-500 text-center">
                Default: admin / maitree2024
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ContactBar />
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Board Members Management</h1>
              <p className="text-gray-600 mt-2">Manage board members, staff, and their information</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => window.open('/board', '_blank')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Page
              </Button>
              <Button
                onClick={() => setIsAuthenticated(false)}
                variant="destructive"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Add/Edit Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {isEditing ? 'Edit Member' : 'Add New Member'}
                {isEditing && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setCurrentMember({});
                      setIsEditing(false);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Photo Upload */}
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border">
                  <img 
                    src={currentMember.photo || '/images/placeholder-avatar.jpg'} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Label>Profile Photo</Label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="block mt-1"
                  />
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name (English)*</Label>
                  <Input
                    value={currentMember.name || ''}
                    onChange={(e) => setCurrentMember({...currentMember, name: e.target.value})}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div>
                  <Label>Name (Nepali)</Label>
                  <Input
                    value={currentMember.nameNepali || ''}
                    onChange={(e) => setCurrentMember({...currentMember, nameNepali: e.target.value})}
                    placeholder="नाम"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Position (English)*</Label>
                  <Input
                    value={currentMember.position || ''}
                    onChange={(e) => setCurrentMember({...currentMember, position: e.target.value})}
                    placeholder="e.g., Chairman, Manager"
                    required
                  />
                </div>
                
                <div>
                  <Label>Position (Nepali)</Label>
                  <Input
                    value={currentMember.positionNepali || ''}
                    onChange={(e) => setCurrentMember({...currentMember, positionNepali: e.target.value})}
                    placeholder="जस्तै: अध्यक्ष, प्रबन्धक"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select 
                    value={currentMember.category} 
                    onValueChange={(value) => setCurrentMember({...currentMember, category: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={currentMember.email || ''}
                    onChange={(e) => setCurrentMember({...currentMember, email: e.target.value})}
                    placeholder="email@example.com"
                  />
                </div>
                
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={currentMember.phone || ''}
                    onChange={(e) => setCurrentMember({...currentMember, phone: e.target.value})}
                    placeholder="9801234567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Join Date</Label>
                  <Input
                    type="date"
                    value={currentMember.joinDate || ''}
                    onChange={(e) => setCurrentMember({...currentMember, joinDate: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={currentMember.featured || false}
                    onChange={(e) => setCurrentMember({...currentMember, featured: e.target.checked})}
                  />
                  <Label htmlFor="featured">Featured Member</Label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Bio (English)</Label>
                  <Textarea
                    value={currentMember.bio || ''}
                    onChange={(e) => setCurrentMember({...currentMember, bio: e.target.value})}
                    placeholder="Brief description about the member"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label>Bio (Nepali)</Label>
                  <Textarea
                    value={currentMember.bioNepali || ''}
                    onChange={(e) => setCurrentMember({...currentMember, bioNepali: e.target.value})}
                    placeholder="सदस्यको बारेमा संक्षिप्त विवरण"
                    rows={3}
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? 'Update Member' : 'Save Member'}
              </Button>
            </CardContent>
          </Card>

          {/* Filter and List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Members List ({filteredMembers.length})</CardTitle>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={member.photo} 
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{member.name}</h3>
                        {member.nameNepali && (
                          <h4 className="text-sm text-gray-600">{member.nameNepali}</h4>
                        )}
                        <p className="text-sm text-green-600">{member.position}</p>
                        {member.featured && (
                          <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <div>Category: {categories.find(c => c.value === member.category)?.label}</div>
                      {member.email && <div>Email: {member.email}</div>}
                      {member.phone && <div>Phone: {member.phone}</div>}
                      <div>Joined: {member.joinDate}</div>
                    </div>
                    
                    {member.bio && (
                      <p className="text-sm text-gray-700 line-clamp-2">{member.bio}</p>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(member)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredMembers.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No members found in this category.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BoardAdmin;