import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  BookOpen, 
  Search, 
  FileText, 
  Layers, 
  Settings, 
  Database,
  GitBranch,
  Code,
  Shield,
  Zap,
  Network,
  Server,
  Cloud,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  ExternalLink,
  Filter,
  Grid3X3,
  List,
  Eye,
  Download,
  Calendar,
  Tag
} from "lucide-react";
import { Application } from "../ApplicationCard";

interface DocsTabProps {
  application: Application;
}

interface Document {
  id: string;
  title: string;
  category: 'architecture' | 'runbooks' | 'api' | 'deployment' | 'monitoring' | 'security';
  type: 'diagram' | 'document' | 'guide' | 'reference';
  description: string;
  content: string;
  lastUpdated: Date;
  author: string;
  tags: string[];
  size: string;
  status: 'current' | 'outdated' | 'draft';
}

// Mock documentation data
const getDocumentsForApp = (appId: string): Document[] => {
  const baseDocuments: Document[] = [
    // Architecture Documents
    {
      id: "arch-001",
      title: "System Architecture Overview",
      category: "architecture",
      type: "diagram",
      description: "High-level system architecture showing all components, data flow, and service interactions",
      content: `# System Architecture Overview

This document provides a comprehensive overview of our system architecture, including all major components and their interactions.

## System Architecture Diagram

\`\`\`mermaid
graph TB
    Client[Client Applications] --> ALB[Application Load Balancer]
    ALB --> API[API Gateway]
    API --> Auth[Authentication Service]
    API --> App1[App Server 1]
    API --> App2[App Server 2]
    API --> App3[App Server 3]
    
    App1 --> Cache[Redis Cache Cluster]
    App2 --> Cache
    App3 --> Cache
    
    App1 --> DB[(Primary Database)]
    App2 --> DB
    App3 --> DB
    
    DB --> Replica1[(Read Replica 1)]
    DB --> Replica2[(Read Replica 2)]
    
    App1 --> Queue[Message Queue]
    App2 --> Queue
    App3 --> Queue
    
    Queue --> Worker1[Background Worker 1]
    Queue --> Worker2[Background Worker 2]
    
    subgraph Monitoring
        Prometheus[Prometheus]
        Grafana[Grafana]
        AlertManager[Alert Manager]
    end
    
    App1 --> Prometheus
    App2 --> Prometheus
    App3 --> Prometheus
    DB --> Prometheus
    Cache --> Prometheus
\`\`\`

## Components

### API Gateway
- **Purpose**: Entry point for all external requests
- **Technology**: Kong/AWS API Gateway
- **Features**: Rate limiting, authentication, request routing
- **Scaling**: Auto-scales based on request volume

### Load Balancer
- **Type**: Application Load Balancer (Layer 7)
- **Health Checks**: HTTP health endpoints on each app server
- **SSL Termination**: Handles TLS encryption/decryption
- **Sticky Sessions**: Disabled for stateless architecture

### Application Servers
- **Count**: 3-10 instances (auto-scaling)
- **Technology**: Node.js/Express
- **Deployment**: Blue-green deployment strategy
- **Health Monitoring**: /health endpoint for load balancer checks

### Database Cluster
- **Primary**: PostgreSQL 14 with high availability
- **Read Replicas**: 2 replicas for read scaling
- **Backup**: Automated daily backups with 30-day retention
- **Monitoring**: Connection pool, query performance, replication lag

### Cache Layer
- **Technology**: Redis Cluster (3 nodes)
- **Use Cases**: Session storage, frequently accessed data, rate limiting
- **Persistence**: RDB snapshots + AOF for durability
- **Failover**: Automatic failover with Redis Sentinel

### Message Queue
- **Technology**: RabbitMQ with clustering
- **Queues**: Background jobs, email notifications, data processing
- **Durability**: Persistent queues with acknowledgments
- **Dead Letter Queue**: For failed message handling

## Data Flow

### Request Processing
1. **Client Request** → Application Load Balancer
2. **Load Balancer** → API Gateway (with SSL termination)
3. **API Gateway** → Authentication Service (if required)
4. **API Gateway** → Application Server (round-robin)
5. **Application Server** → Cache (check for cached data)
6. **Application Server** → Database (if cache miss)
7. **Response** flows back through the same path

### Background Processing
1. **Application Server** → Message Queue (async tasks)
2. **Background Workers** → Process messages from queue
3. **Workers** → Database/External APIs (as needed)
4. **Workers** → Update job status in database

## Security Architecture

### Network Security
- **VPC**: All resources in private subnets
- **Security Groups**: Restrictive ingress/egress rules
- **WAF**: Web Application Firewall at load balancer
- **DDoS Protection**: AWS Shield Advanced

### Application Security
- **Authentication**: OAuth 2.0 with JWT tokens
- **Authorization**: Role-based access control (RBAC)
- **Rate Limiting**: Per-user and per-IP limits
- **Input Validation**: Comprehensive request validation

### Data Security
- **Encryption at Rest**: Database and cache encryption
- **Encryption in Transit**: TLS 1.3 for all communications
- **Secrets Management**: AWS Secrets Manager/HashiCorp Vault
- **Audit Logging**: All access and changes logged

## Scalability Considerations

### Horizontal Scaling
- **Application Servers**: Auto-scaling groups (3-10 instances)
- **Database**: Read replicas for read scaling
- **Cache**: Redis cluster with sharding
- **Workers**: Queue-based scaling

### Performance Optimization
- **CDN**: CloudFront for static assets
- **Caching Strategy**: Multi-layer caching (CDN, Redis, application)
- **Database Optimization**: Proper indexing, query optimization
- **Connection Pooling**: Efficient database connection management

## Monitoring and Observability

### Metrics Collection
- **Application Metrics**: Custom business metrics
- **Infrastructure Metrics**: CPU, memory, disk, network
- **Database Metrics**: Query performance, connection pool
- **Cache Metrics**: Hit ratio, memory usage

### Logging
- **Centralized Logging**: ELK stack (Elasticsearch, Logstash, Kibana)
- **Log Levels**: DEBUG, INFO, WARN, ERROR, FATAL
- **Structured Logging**: JSON format for better parsing
- **Log Retention**: 30 days for application logs, 90 days for access logs

### Alerting
- **Critical Alerts**: PagerDuty for immediate response
- **Warning Alerts**: Slack notifications
- **Thresholds**: Error rate >5%, response time >2s, CPU >80%
- **Escalation**: Automatic escalation if not acknowledged`,
      lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      author: "Sarah Chen",
      tags: ["architecture", "overview", "components"],
      size: "2.4 MB",
      status: "current"
    },
    {
      id: "arch-002",
      title: "Database Schema Design",
      category: "architecture",
      type: "diagram",
      description: "Complete database schema with relationships, indexes, and constraints",
      content: `# Database Schema Design

## Core Tables

### Users Table
- id (PRIMARY KEY)
- email (UNIQUE)
- password_hash
- created_at
- updated_at
- status

### Applications Table
- id (PRIMARY KEY)
- name
- description
- owner_id (FOREIGN KEY → users.id)
- created_at
- status

### Metrics Table
- id (PRIMARY KEY)
- application_id (FOREIGN KEY)
- metric_name
- value
- timestamp
- tags (JSONB)

## Indexes
- users_email_idx ON users(email)
- metrics_app_time_idx ON metrics(application_id, timestamp)
- metrics_name_time_idx ON metrics(metric_name, timestamp)

## Constraints
- All tables have created_at/updated_at timestamps
- Foreign key constraints with CASCADE DELETE
- Check constraints for status fields`,
      lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      author: "Mike Rodriguez",
      tags: ["database", "schema", "relationships"],
      size: "1.8 MB",
      status: "current"
    },
    {
      id: "arch-003",
      title: "Network Architecture Diagram",
      category: "architecture",
      type: "diagram",
      description: "Network topology, security groups, and connectivity patterns",
      content: `# Network Architecture

## VPC Structure
- Production VPC: 10.0.0.0/16
- Staging VPC: 10.1.0.0/16
- Development VPC: 10.2.0.0/16

## Subnets
### Production VPC
- Public Subnet A: 10.0.1.0/24 (Load Balancers)
- Public Subnet B: 10.0.2.0/24 (NAT Gateways)
- Private Subnet A: 10.0.10.0/24 (App Servers)
- Private Subnet B: 10.0.11.0/24 (App Servers)
- Database Subnet A: 10.0.20.0/24 (RDS)
- Database Subnet B: 10.0.21.0/24 (RDS)

## Security Groups
- ALB-SG: Allow 80/443 from 0.0.0.0/0
- App-SG: Allow 8080 from ALB-SG
- DB-SG: Allow 5432 from App-SG
- Cache-SG: Allow 6379 from App-SG

## Connectivity
- Internet Gateway for public subnets
- NAT Gateways for private subnet internet access
- VPC Peering for cross-environment access
- VPN Gateway for on-premises connectivity`,
      lastUpdated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      author: "Alex Kim",
      tags: ["network", "vpc", "security-groups"],
      size: "3.1 MB",
      status: "current"
    },

    // Runbooks
    {
      id: "run-001",
      title: "Incident Response Playbook",
      category: "runbooks",
      type: "guide",
      description: "Step-by-step incident response procedures and escalation matrix",
      content: `# Incident Response Playbook

## Severity Levels

### P0 - Critical
- Complete service outage
- Data loss or corruption
- Security breach
- **Response Time**: Immediate (< 15 minutes)

### P1 - High
- Significant feature degradation
- Performance issues affecting >50% users
- **Response Time**: < 1 hour

### P2 - Medium
- Minor feature issues
- Performance degradation <50% users
- **Response Time**: < 4 hours

## Response Steps

### 1. Detection & Assessment (0-5 minutes)
- Acknowledge alert in PagerDuty
- Join incident bridge: #incident-response
- Assess severity and impact
- Declare incident if P0/P1

### 2. Initial Response (5-15 minutes)
- Notify stakeholders via Slack
- Create incident ticket in Jira
- Begin investigation and mitigation
- Update status page if customer-facing

### 3. Investigation (15+ minutes)
- Check recent deployments
- Review metrics and logs
- Identify root cause
- Implement fix or rollback

### 4. Resolution & Follow-up
- Verify fix resolves issue
- Update stakeholders
- Schedule post-incident review
- Update documentation

## Escalation Matrix
- L1: On-call engineer
- L2: Senior engineer + Engineering manager
- L3: Director of Engineering + CTO
- Executive: CEO (for P0 incidents >2 hours)

## Communication Templates
- Initial: "We are investigating reports of [issue]. Updates in 30 minutes."
- Update: "We have identified the cause as [root cause]. ETA for resolution: [time]."
- Resolution: "The issue has been resolved. Services are operating normally."`,
      lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      author: "Jennifer Walsh",
      tags: ["incident", "response", "escalation"],
      size: "856 KB",
      status: "current"
    },
    {
      id: "run-002",
      title: "Database Maintenance Procedures",
      category: "runbooks",
      type: "guide",
      description: "Regular database maintenance tasks, backup procedures, and recovery steps",
      content: `# Database Maintenance Procedures

## Daily Tasks
- [ ] Check backup completion status
- [ ] Review slow query log
- [ ] Monitor disk space usage
- [ ] Verify replication lag < 1 second

## Weekly Tasks
- [ ] Analyze query performance
- [ ] Review and optimize indexes
- [ ] Check for unused indexes
- [ ] Update table statistics

## Monthly Tasks
- [ ] Full backup verification
- [ ] Disaster recovery test
- [ ] Capacity planning review
- [ ] Security audit

## Backup Procedures

### Automated Backups
- Full backup: Daily at 2 AM UTC
- Transaction log backup: Every 15 minutes
- Retention: 30 days for full, 7 days for logs

### Manual Backup
\`\`\`bash
# Create manual backup
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME > backup_$(date +%Y%m%d_%H%M%S).sql

# Verify backup
pg_restore --list backup_file.sql
\`\`\`

## Recovery Procedures

### Point-in-Time Recovery
1. Stop application servers
2. Restore from latest full backup
3. Apply transaction logs up to desired point
4. Verify data integrity
5. Restart application servers

### Failover to Replica
1. Promote read replica to primary
2. Update application connection strings
3. Verify write operations work
4. Monitor for replication lag

## Performance Monitoring
- Query execution time > 1 second
- Connection count > 80% of max
- Disk usage > 85%
- Replication lag > 5 seconds

## Emergency Contacts
- DBA On-call: +1-555-0123
- Database vendor support: Case priority High
- Cloud provider support: Severity 2`,
      lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      author: "David Park",
      tags: ["database", "maintenance", "backup", "recovery"],
      size: "1.2 MB",
      status: "current"
    },
    {
      id: "run-003",
      title: "Deployment Rollback Procedures",
      category: "runbooks",
      type: "guide",
      description: "Emergency rollback procedures for failed deployments",
      content: `# Deployment Rollback Procedures

## When to Rollback
- Error rate > 5% for 5+ minutes
- Response time > 2x baseline for 10+ minutes
- Critical functionality broken
- Security vulnerability introduced

## Rollback Methods

### 1. Blue-Green Rollback (Preferred)
\`\`\`bash
# Switch traffic back to previous version
kubectl patch service app-service -p '{"spec":{"selector":{"version":"v1.2.3"}}}'

# Verify traffic switch
kubectl get endpoints app-service
\`\`\`

### 2. Rolling Rollback
\`\`\`bash
# Rollback to previous deployment
kubectl rollout undo deployment/app-deployment

# Monitor rollback progress
kubectl rollout status deployment/app-deployment
\`\`\`

### 3. Database Rollback
\`\`\`bash
# Apply rollback migration
./manage.py migrate app_name 0042_previous_migration

# Verify schema state
./manage.py showmigrations
\`\`\`

## Verification Steps
1. Check application health endpoints
2. Verify key user flows work
3. Monitor error rates and response times
4. Confirm database consistency
5. Test critical integrations

## Post-Rollback Actions
- Notify stakeholders of rollback
- Create incident ticket
- Schedule post-mortem
- Block problematic deployment
- Update monitoring alerts

## Emergency Contacts
- Release Manager: Slack @release-team
- Platform Team: #platform-support
- Database Team: #database-support`,
      lastUpdated: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      author: "Lisa Thompson",
      tags: ["deployment", "rollback", "emergency"],
      size: "743 KB",
      status: "current"
    },

    // API Documentation
    {
      id: "api-001",
      title: "REST API Reference",
      category: "api",
      type: "reference",
      description: "Complete REST API documentation with endpoints, parameters, and examples",
      content: `# REST API Reference

## Authentication
All API requests require authentication via Bearer token:
\`\`\`
Authorization: Bearer <your-api-token>
\`\`\`

## Base URL
- Production: https://api.example.com/v1
- Staging: https://api-staging.example.com/v1

## Endpoints

### Users
#### GET /users
List all users with pagination.

**Parameters:**
- \`page\` (integer): Page number (default: 1)
- \`limit\` (integer): Items per page (default: 20, max: 100)
- \`search\` (string): Search by name or email

**Response:**
\`\`\`json
{
  "users": [
    {
      "id": 123,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-15T10:30:00Z",
      "status": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
\`\`\`

#### POST /users
Create a new user.

**Request Body:**
\`\`\`json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "secure-password"
}
\`\`\`

**Response:** 201 Created
\`\`\`json
{
  "id": 124,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "created_at": "2024-01-16T14:22:00Z",
  "status": "active"
}
\`\`\`

### Applications
#### GET /applications
List user's applications.

#### POST /applications
Create new application.

#### GET /applications/{id}/metrics
Get application metrics.

**Parameters:**
- \`start_time\` (ISO 8601): Start of time range
- \`end_time\` (ISO 8601): End of time range
- \`metrics\` (array): Specific metrics to retrieve

## Error Handling
All errors return consistent format:
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "email": ["Email is required"]
    }
  }
}
\`\`\`

## Rate Limiting
- 1000 requests per hour per API key
- 429 status code when limit exceeded
- Rate limit headers included in responses`,
      lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      author: "Carlos Martinez",
      tags: ["api", "rest", "endpoints"],
      size: "2.8 MB",
      status: "current"
    },

    // Deployment Guides
    {
      id: "deploy-001",
      title: "Production Deployment Guide",
      category: "deployment",
      type: "guide",
      description: "Complete guide for deploying applications to production environment",
      content: `# Production Deployment Guide

## Prerequisites
- [ ] Code reviewed and approved
- [ ] All tests passing
- [ ] Security scan completed
- [ ] Performance testing completed
- [ ] Database migrations tested
- [ ] Rollback plan prepared

## Deployment Process

### 1. Pre-deployment Checks
\`\`\`bash
# Verify environment
kubectl config current-context
# Should show: production

# Check cluster health
kubectl get nodes
kubectl get pods --all-namespaces | grep -v Running

# Verify database connectivity
./scripts/check-db-connection.sh
\`\`\`

### 2. Database Migrations
\`\`\`bash
# Backup database
./scripts/backup-database.sh production

# Run migrations in dry-run mode
./manage.py migrate --dry-run

# Apply migrations
./manage.py migrate
\`\`\`

### 3. Application Deployment
\`\`\`bash
# Build and push image
docker build -t app:v1.2.4 .
docker push registry.example.com/app:v1.2.4

# Update deployment
kubectl set image deployment/app-deployment app=registry.example.com/app:v1.2.4

# Monitor rollout
kubectl rollout status deployment/app-deployment --timeout=600s
\`\`\`

### 4. Post-deployment Verification
- [ ] Health check endpoints responding
- [ ] Key user flows working
- [ ] Metrics showing normal patterns
- [ ] No error spikes in logs
- [ ] External integrations working

### 5. Monitoring
- Watch error rates for 30 minutes
- Monitor response times
- Check resource utilization
- Verify alerts are working

## Rollback Procedure
If issues detected:
1. Execute rollback: \`kubectl rollout undo deployment/app-deployment\`
2. Verify rollback successful
3. Investigate and fix issues
4. Schedule new deployment

## Emergency Contacts
- On-call Engineer: PagerDuty
- Release Manager: Slack @release-team
- Platform Team: #platform-support`,
      lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      author: "Rachel Green",
      tags: ["deployment", "production", "kubernetes"],
      size: "1.5 MB",
      status: "current"
    },

    // Monitoring Documentation
    {
      id: "monitor-001",
      title: "Monitoring and Alerting Setup",
      category: "monitoring",
      type: "guide",
      description: "Complete monitoring stack configuration and alerting rules",
      content: `# Monitoring and Alerting Setup

## Monitoring Stack
- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboards
- **AlertManager**: Alert routing and notification
- **Jaeger**: Distributed tracing
- **ELK Stack**: Log aggregation and analysis

## Key Metrics

### Application Metrics
- Request rate (requests/second)
- Response time (p50, p95, p99)
- Error rate (percentage)
- Active connections
- Queue depth

### Infrastructure Metrics
- CPU utilization
- Memory usage
- Disk I/O
- Network throughput
- Database connections

## Alert Rules

### Critical Alerts (PagerDuty)
\`\`\`yaml
# High error rate
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "High error rate detected"

# Response time degradation
- alert: HighResponseTime
  expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
  for: 10m
  labels:
    severity: critical
\`\`\`

### Warning Alerts (Slack)
\`\`\`yaml
# High CPU usage
- alert: HighCPUUsage
  expr: cpu_usage_percent > 80
  for: 15m
  labels:
    severity: warning

# Low disk space
- alert: LowDiskSpace
  expr: disk_free_percent < 20
  for: 5m
  labels:
    severity: warning
\`\`\`

## Dashboard Configuration
### Application Dashboard
- Request rate and error rate
- Response time percentiles
- Active users and sessions
- Database query performance

### Infrastructure Dashboard
- Node resource utilization
- Pod status and restarts
- Network and disk I/O
- Database metrics

## Log Analysis
### Important Log Patterns
- Error logs: \`level:ERROR\`
- Slow queries: \`duration:>1000ms\`
- Authentication failures: \`auth:failed\`
- Rate limit hits: \`rate_limit:exceeded\`

### Log Retention
- Application logs: 30 days
- Access logs: 90 days
- Audit logs: 1 year
- Error logs: 6 months

## Runbook Integration
Each alert includes runbook links:
- Investigation steps
- Common causes
- Resolution procedures
- Escalation contacts`,
      lastUpdated: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      author: "Tom Wilson",
      tags: ["monitoring", "alerting", "prometheus", "grafana"],
      size: "2.1 MB",
      status: "current"
    }
  ];

  // Add app-specific documents
  if (appId === "3") { // Payment Service
    baseDocuments.push({
      id: "pay-001",
      title: "Payment Processing Architecture",
      category: "architecture",
      type: "diagram",
      description: "Payment service architecture with fraud detection and compliance",
      content: `# Payment Processing Architecture

## Components
- Payment Gateway
- Fraud Detection Engine
- Compliance Module
- Transaction Database
- Audit Trail System

## Security Measures
- PCI DSS compliance
- End-to-end encryption
- Tokenization of sensitive data
- Real-time fraud monitoring`,
      lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      author: "Security Team",
      tags: ["payment", "security", "compliance"],
      size: "3.2 MB",
      status: "current"
    });
  }

  return baseDocuments;
};

export default function DocsTab({ application }: DocsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const documents = getDocumentsForApp(application.id);

  const categories = [
    { id: "all", label: "All Documents", icon: BookOpen, count: documents.length },
    { id: "architecture", label: "Architecture", icon: Layers, count: documents.filter(d => d.category === 'architecture').length },
    { id: "runbooks", label: "Runbooks", icon: FileText, count: documents.filter(d => d.category === 'runbooks').length },
    { id: "api", label: "API Docs", icon: Code, count: documents.filter(d => d.category === 'api').length },
    { id: "deployment", label: "Deployment", icon: Zap, count: documents.filter(d => d.category === 'deployment').length },
    { id: "monitoring", label: "Monitoring", icon: Monitor, count: documents.filter(d => d.category === 'monitoring').length },
    { id: "security", label: "Security", icon: Shield, count: documents.filter(d => d.category === 'security').length }
  ];

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = searchQuery === "" || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [documents, searchQuery, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'architecture': return Layers;
      case 'runbooks': return FileText;
      case 'api': return Code;
      case 'deployment': return Zap;
      case 'monitoring': return Monitor;
      case 'security': return Shield;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'architecture': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'runbooks': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'api': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'deployment': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'monitoring': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'security': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-green-600';
      case 'outdated': return 'text-yellow-600';
      case 'draft': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current': return CheckCircle;
      case 'outdated': return AlertTriangle;
      case 'draft': return Clock;
      default: return Clock;
    }
  };

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
    setShowDocumentModal(true);
  };

  const DocumentCard = ({ document }: { document: Document }) => {
    const Icon = getCategoryIcon(document.category);
    const StatusIcon = getStatusIcon(document.status);
    
    return (
      <Card 
        className="hover-lift transition-all duration-200 cursor-pointer h-full"
        onClick={() => handleDocumentClick(document)}
      >
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(document.category)}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1">
              <StatusIcon className={`w-4 h-4 ${getStatusColor(document.status)}`} />
              <Badge variant="outline" className="text-xs">
                {document.type}
              </Badge>
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium mb-2 line-clamp-2">{document.title}</h4>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{document.description}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {document.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {document.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{document.tags.length - 3}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{document.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{document.lastUpdated.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const DocumentListItem = ({ document }: { document: Document }) => {
    const Icon = getCategoryIcon(document.category);
    const StatusIcon = getStatusIcon(document.status);
    
    return (
      <div 
        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
        onClick={() => handleDocumentClick(document)}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(document.category)}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium truncate">{document.title}</h4>
              <StatusIcon className={`w-4 h-4 ${getStatusColor(document.status)} flex-shrink-0`} />
              <Badge variant="outline" className="text-xs flex-shrink-0">
                {document.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate">{document.description}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>{document.author}</span>
              <span>{document.lastUpdated.toLocaleDateString()}</span>
              <span>{document.size}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-wrap gap-1 max-w-xs">
            {document.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Documentation</h3>
          <p className="text-sm text-muted-foreground">
            Architecture diagrams, runbooks, and documentation for {application.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="https://docs.example.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              External Docs
            </a>
          </Button>
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Icon className="w-4 h-4" />
                {category.label}
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Documents */}
      {filteredDocuments.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-2'
        }>
          {filteredDocuments.map((document) => 
            viewMode === 'grid' ? (
              <DocumentCard key={document.id} document={document} />
            ) : (
              <DocumentListItem key={document.id} document={document} />
            )
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">No Documents Found</h4>
            <p className="text-muted-foreground">
              {searchQuery ? 
                `No documents match "${searchQuery}". Try adjusting your search terms.` :
                "No documents available in this category."
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Document Preview Modal */}
      {showDocumentModal && selectedDocument && (
        <Dialog open={showDocumentModal} onOpenChange={setShowDocumentModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-2">
                  {(() => {
                    const Icon = getCategoryIcon(selectedDocument.category);
                    return <Icon className="w-5 h-5" />;
                  })()}
                  {selectedDocument.title}
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open External
                    </a>
                  </Button>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Document Metadata */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <div className="font-medium capitalize">{selectedDocument.category}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Author:</span>
                    <div className="font-medium">{selectedDocument.author}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Updated:</span>
                    <div className="font-medium">{selectedDocument.lastUpdated.toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <div className="font-medium">{selectedDocument.size}</div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedDocument.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Document Content */}
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="bg-muted/30 rounded-lg p-6">
                  <pre className="whitespace-pre-wrap text-sm">{selectedDocument.content}</pre>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}