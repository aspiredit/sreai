import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DocumentRenderer from "./DocumentRenderer";
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

This document outlines the complete database schema design including entity relationships, indexes, and constraints.

## Entity Relationship Diagram

\`\`\`mermaid
erDiagram
    USERS {
        uuid id PK
        string email UK
        string password_hash
        string first_name
        string last_name
        enum status
        timestamp created_at
        timestamp updated_at
    }
    
    APPLICATIONS {
        uuid id PK
        string name
        text description
        uuid owner_id FK
        enum status
        jsonb config
        timestamp created_at
        timestamp updated_at
    }
    
    METRICS {
        uuid id PK
        uuid application_id FK
        string metric_name
        float value
        jsonb tags
        timestamp timestamp
        timestamp created_at
    }
    
    INCIDENTS {
        uuid id PK
        uuid application_id FK
        string title
        text description
        enum severity
        enum status
        uuid assigned_to FK
        timestamp started_at
        timestamp resolved_at
        timestamp created_at
        timestamp updated_at
    }
    
    LOGS {
        uuid id PK
        uuid application_id FK
        enum level
        text message
        jsonb metadata
        string source
        timestamp timestamp
        timestamp created_at
    }
    
    USER_ROLES {
        uuid id PK
        uuid user_id FK
        uuid application_id FK
        enum role
        timestamp created_at
    }
    
    USERS ||--o{ APPLICATIONS : owns
    USERS ||--o{ USER_ROLES : has
    USERS ||--o{ INCIDENTS : assigned_to
    APPLICATIONS ||--o{ METRICS : generates
    APPLICATIONS ||--o{ INCIDENTS : has
    APPLICATIONS ||--o{ LOGS : produces
    APPLICATIONS ||--o{ USER_ROLES : grants_access
\`\`\`

## Table Definitions

### Users Table
Stores user account information and authentication data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| password_hash | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| first_name | VARCHAR(100) | NOT NULL | User's first name |
| last_name | VARCHAR(100) | NOT NULL | User's last name |
| status | ENUM | NOT NULL | active, inactive, suspended |
| created_at | TIMESTAMP | NOT NULL | Account creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

### Applications Table
Stores application metadata and configuration.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique application identifier |
| name | VARCHAR(255) | NOT NULL | Application name |
| description | TEXT | | Application description |
| owner_id | UUID | FOREIGN KEY | Reference to users.id |
| status | ENUM | NOT NULL | active, inactive, maintenance |
| config | JSONB | | Application configuration |
| created_at | TIMESTAMP | NOT NULL | Creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

### Metrics Table
Stores time-series metrics data for applications.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique metric record identifier |
| application_id | UUID | FOREIGN KEY | Reference to applications.id |
| metric_name | VARCHAR(100) | NOT NULL | Name of the metric |
| value | DOUBLE PRECISION | NOT NULL | Metric value |
| tags | JSONB | | Additional metric metadata |
| timestamp | TIMESTAMP | NOT NULL | Metric timestamp |
| created_at | TIMESTAMP | NOT NULL | Record creation time |

### Incidents Table
Stores incident information and tracking.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique incident identifier |
| application_id | UUID | FOREIGN KEY | Reference to applications.id |
| title | VARCHAR(255) | NOT NULL | Incident title |
| description | TEXT | | Detailed incident description |
| severity | ENUM | NOT NULL | critical, high, medium, low |
| status | ENUM | NOT NULL | open, investigating, resolved |
| assigned_to | UUID | FOREIGN KEY | Reference to users.id |
| started_at | TIMESTAMP | NOT NULL | Incident start time |
| resolved_at | TIMESTAMP | | Incident resolution time |
| created_at | TIMESTAMP | NOT NULL | Record creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

## Indexes

### Performance Indexes
\`\`\`sql
-- Users table indexes
CREATE UNIQUE INDEX users_email_idx ON users(email);
CREATE INDEX users_status_idx ON users(status);

-- Applications table indexes
CREATE INDEX applications_owner_idx ON applications(owner_id);
CREATE INDEX applications_status_idx ON applications(status);

-- Metrics table indexes (critical for performance)
CREATE INDEX metrics_app_time_idx ON metrics(application_id, timestamp DESC);
CREATE INDEX metrics_name_time_idx ON metrics(metric_name, timestamp DESC);
CREATE INDEX metrics_timestamp_idx ON metrics(timestamp DESC);

-- Incidents table indexes
CREATE INDEX incidents_app_idx ON incidents(application_id);
CREATE INDEX incidents_status_idx ON incidents(status);
CREATE INDEX incidents_severity_idx ON incidents(severity);
CREATE INDEX incidents_assigned_idx ON incidents(assigned_to);

-- Logs table indexes
CREATE INDEX logs_app_time_idx ON logs(application_id, timestamp DESC);
CREATE INDEX logs_level_idx ON logs(level);
CREATE INDEX logs_timestamp_idx ON logs(timestamp DESC);

-- User roles indexes
CREATE UNIQUE INDEX user_roles_unique_idx ON user_roles(user_id, application_id);
\`\`\`

## Constraints and Rules

### Foreign Key Constraints
\`\`\`sql
-- Applications reference users
ALTER TABLE applications 
ADD CONSTRAINT fk_applications_owner 
FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE;

-- Metrics reference applications
ALTER TABLE metrics 
ADD CONSTRAINT fk_metrics_application 
FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE;

-- Incidents reference applications and users
ALTER TABLE incidents 
ADD CONSTRAINT fk_incidents_application 
FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE;

ALTER TABLE incidents 
ADD CONSTRAINT fk_incidents_assigned_to 
FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL;
\`\`\`

### Check Constraints
\`\`\`sql
-- Ensure valid email format
ALTER TABLE users 
ADD CONSTRAINT check_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Ensure positive metric values where applicable
ALTER TABLE metrics 
ADD CONSTRAINT check_positive_values 
CHECK (
  metric_name NOT IN ('response_time', 'cpu_usage', 'memory_usage') 
  OR value >= 0
);

-- Ensure incident resolution time is after start time
ALTER TABLE incidents 
ADD CONSTRAINT check_resolution_time 
CHECK (resolved_at IS NULL OR resolved_at >= started_at);
\`\`\`

## Data Retention Policies

### Automated Cleanup
\`\`\`sql
-- Delete metrics older than 90 days
DELETE FROM metrics 
WHERE created_at < NOW() - INTERVAL '90 days';

-- Delete logs older than 30 days
DELETE FROM logs 
WHERE created_at < NOW() - INTERVAL '30 days';

-- Archive resolved incidents older than 1 year
-- (Move to incidents_archive table)
\`\`\`

## Performance Considerations

### Partitioning Strategy
- **Metrics table**: Partition by month on timestamp column
- **Logs table**: Partition by week on timestamp column
- **Incidents table**: No partitioning needed (smaller dataset)

### Query Optimization
- Use covering indexes for common query patterns
- Implement proper connection pooling (max 20 connections)
- Use read replicas for reporting queries
- Implement query timeout limits (30 seconds max)

### Monitoring
- Track slow queries (>1 second)
- Monitor index usage and effectiveness
- Alert on connection pool exhaustion
- Track database size growth trends`,
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

This document describes our complete network architecture including VPC design, security groups, and connectivity patterns.

## Network Topology Diagram

\`\`\`mermaid
graph TB
    Internet[Internet] --> IGW[Internet Gateway]
    
    subgraph "Production VPC (10.0.0.0/16)"
        IGW --> ALB[Application Load Balancer]
        
        subgraph "Public Subnets"
            ALB --> PubA[Public Subnet A<br/>10.0.1.0/24]
            ALB --> PubB[Public Subnet B<br/>10.0.2.0/24]
            PubA --> NAT1[NAT Gateway 1]
            PubB --> NAT2[NAT Gateway 2]
        end
        
        subgraph "Private Subnets"
            NAT1 --> PrivA[Private Subnet A<br/>10.0.10.0/24]
            NAT2 --> PrivB[Private Subnet B<br/>10.0.11.0/24]
            
            PrivA --> App1[App Server 1]
            PrivA --> App2[App Server 2]
            PrivB --> App3[App Server 3]
            PrivB --> App4[App Server 4]
        end
        
        subgraph "Database Subnets"
            PrivA --> DBA[DB Subnet A<br/>10.0.20.0/24]
            PrivB --> DBB[DB Subnet B<br/>10.0.21.0/24]
            
            DBA --> RDS1[(RDS Primary)]
            DBB --> RDS2[(RDS Replica)]
            
            DBA --> Cache1[Redis Cache 1]
            DBB --> Cache2[Redis Cache 2]
        end
    end
    
    subgraph "Staging VPC (10.1.0.0/16)"
        StagingApp[Staging Environment]
    end
    
    subgraph "Development VPC (10.2.0.0/16)"
        DevApp[Development Environment]
    end
    
    subgraph "On-Premises"
        OnPrem[Corporate Network]
    end
    
    ALB --> App1
    ALB --> App2
    ALB --> App3
    ALB --> App4
    
    App1 --> RDS1
    App2 --> RDS1
    App3 --> RDS1
    App4 --> RDS1
    
    App1 --> Cache1
    App2 --> Cache1
    App3 --> Cache2
    App4 --> Cache2
    
    ProdVPC -.-> StagingVPC
    StagingVPC -.-> DevVPC
    ProdVPC -.-> OnPrem
\`\`\`

## VPC Structure

### Production VPC (10.0.0.0/16)
- **Purpose**: Production workloads
- **CIDR Block**: 10.0.0.0/16 (65,536 IP addresses)
- **Availability Zones**: 2 AZs for high availability
- **DNS Hostnames**: Enabled
- **DNS Resolution**: Enabled

### Staging VPC (10.1.0.0/16)
- **Purpose**: Pre-production testing
- **CIDR Block**: 10.1.0.0/16 (65,536 IP addresses)
- **Availability Zones**: 2 AZs
- **Environment**: Mirrors production architecture

### Development VPC (10.2.0.0/16)
- **Purpose**: Development and testing
- **CIDR Block**: 10.2.0.0/16 (65,536 IP addresses)
- **Availability Zones**: 1 AZ (cost optimization)
- **Resources**: Smaller instance sizes

## Subnet Design

### Public Subnets
| Subnet | CIDR | AZ | Purpose | Resources |
|--------|------|----|---------|-----------| 
| Public A | 10.0.1.0/24 | us-east-1a | Load Balancers | ALB, NAT Gateway |
| Public B | 10.0.2.0/24 | us-east-1b | Load Balancers | ALB, NAT Gateway |

### Private Subnets
| Subnet | CIDR | AZ | Purpose | Resources |
|--------|------|----|---------|-----------| 
| Private A | 10.0.10.0/24 | us-east-1a | Application Servers | EC2, ECS Tasks |
| Private B | 10.0.11.0/24 | us-east-1b | Application Servers | EC2, ECS Tasks |

### Database Subnets
| Subnet | CIDR | AZ | Purpose | Resources |
|--------|------|----|---------|-----------| 
| Database A | 10.0.20.0/24 | us-east-1a | Database Services | RDS, ElastiCache |
| Database B | 10.0.21.0/24 | us-east-1b | Database Services | RDS, ElastiCache |

## Security Groups

### Application Load Balancer Security Group (ALB-SG)
\`\`\`yaml
Inbound Rules:
  - Port 80 (HTTP): 0.0.0.0/0
  - Port 443 (HTTPS): 0.0.0.0/0

Outbound Rules:
  - Port 8080: App-SG (Application servers)
  - Port 443: 0.0.0.0/0 (Health checks)
\`\`\`

### Application Server Security Group (App-SG)
\`\`\`yaml
Inbound Rules:
  - Port 8080: ALB-SG (From load balancer)
  - Port 22: Bastion-SG (SSH access)

Outbound Rules:
  - Port 5432: DB-SG (PostgreSQL)
  - Port 6379: Cache-SG (Redis)
  - Port 443: 0.0.0.0/0 (External APIs)
  - Port 80: 0.0.0.0/0 (Package updates)
\`\`\`

### Database Security Group (DB-SG)
\`\`\`yaml
Inbound Rules:
  - Port 5432: App-SG (PostgreSQL from apps)
  - Port 5432: Bastion-SG (Admin access)

Outbound Rules:
  - None (Database doesn't initiate outbound connections)
\`\`\`

### Cache Security Group (Cache-SG)
\`\`\`yaml
Inbound Rules:
  - Port 6379: App-SG (Redis from apps)

Outbound Rules:
  - None (Cache doesn't initiate outbound connections)
\`\`\`

### Bastion Host Security Group (Bastion-SG)
\`\`\`yaml
Inbound Rules:
  - Port 22: Corporate-IP-Range (SSH from office)

Outbound Rules:
  - Port 22: App-SG (SSH to app servers)
  - Port 5432: DB-SG (Database admin)
\`\`\`

## Network Access Control Lists (NACLs)

### Public Subnet NACL
\`\`\`yaml
Inbound Rules:
  - Rule 100: HTTP (80) from 0.0.0.0/0 - ALLOW
  - Rule 110: HTTPS (443) from 0.0.0.0/0 - ALLOW
  - Rule 120: Ephemeral ports (1024-65535) from 0.0.0.0/0 - ALLOW
  - Rule 32767: ALL Traffic - DENY

Outbound Rules:
  - Rule 100: HTTP (80) to 0.0.0.0/0 - ALLOW
  - Rule 110: HTTPS (443) to 0.0.0.0/0 - ALLOW
  - Rule 120: Ephemeral ports (1024-65535) to 0.0.0.0/0 - ALLOW
  - Rule 32767: ALL Traffic - DENY
\`\`\`

### Private Subnet NACL
\`\`\`yaml
Inbound Rules:
  - Rule 100: HTTP (80) from 10.0.0.0/16 - ALLOW
  - Rule 110: HTTPS (443) from 10.0.0.0/16 - ALLOW
  - Rule 120: App Port (8080) from 10.0.0.0/16 - ALLOW
  - Rule 130: SSH (22) from 10.0.0.0/16 - ALLOW
  - Rule 140: Ephemeral ports (1024-65535) from 0.0.0.0/0 - ALLOW
  - Rule 32767: ALL Traffic - DENY

Outbound Rules:
  - Rule 100: ALL Traffic to 0.0.0.0/0 - ALLOW
\`\`\`

## Connectivity Patterns

### Internet Connectivity
\`\`\`mermaid
sequenceDiagram
    participant Client
    participant IGW as Internet Gateway
    participant ALB as Load Balancer
    participant App as App Server
    participant NAT as NAT Gateway
    participant API as External API
    
    Client->>IGW: HTTPS Request
    IGW->>ALB: Forward to ALB
    ALB->>App: Route to App Server
    App->>NAT: Outbound API Call
    NAT->>API: External API Request
    API->>NAT: API Response
    NAT->>App: Return Response
    App->>ALB: Application Response
    ALB->>IGW: Return to Client
    IGW->>Client: HTTPS Response
\`\`\`

### VPC Peering
- **Production ↔ Staging**: For data migration and testing
- **Staging ↔ Development**: For promoting code changes
- **Route Tables**: Specific routes for cross-VPC communication

### VPN Connectivity
- **Site-to-Site VPN**: Corporate office to Production VPC
- **Client VPN**: Remote developer access to Development VPC
- **Backup Connection**: Secondary VPN for redundancy

## Route Tables

### Public Route Table
| Destination | Target | Purpose |
|-------------|--------|---------|
| 10.0.0.0/16 | Local | VPC internal traffic |
| 0.0.0.0/0 | Internet Gateway | Internet access |

### Private Route Table
| Destination | Target | Purpose |
|-------------|--------|---------|
| 10.0.0.0/16 | Local | VPC internal traffic |
| 0.0.0.0/0 | NAT Gateway | Outbound internet access |

### Database Route Table
| Destination | Target | Purpose |
|-------------|--------|---------|
| 10.0.0.0/16 | Local | VPC internal traffic only |

## Network Monitoring

### VPC Flow Logs
- **Capture**: All network traffic metadata
- **Storage**: CloudWatch Logs with 30-day retention
- **Analysis**: Automated security analysis with GuardDuty

### Network Performance
- **Latency Monitoring**: Between AZs and to external services
- **Bandwidth Utilization**: NAT Gateway and Internet Gateway usage
- **Connection Tracking**: Active connections per security group

### Security Monitoring
- **Unusual Traffic Patterns**: Automated detection and alerting
- **Failed Connection Attempts**: Blocked by security groups
- **DDoS Protection**: AWS Shield Advanced integration

## Disaster Recovery

### Multi-AZ Deployment
- All critical resources deployed across 2 availability zones
- Automatic failover for RDS and ElastiCache
- Load balancer health checks ensure traffic routing

### Cross-Region Backup
- Database backups replicated to secondary region
- AMI snapshots stored in multiple regions
- Infrastructure as Code for rapid environment recreation`,
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

This guide provides comprehensive instructions for deploying applications to our production environment using blue-green deployment strategy.

## Deployment Flow Diagram

\`\`\`mermaid
flowchart TD
    A[Developer Push] --> B[CI Pipeline Triggered]
    B --> C{All Tests Pass?}
    C -->|No| D[Notify Developer]
    C -->|Yes| E[Build Docker Image]
    E --> F[Push to Registry]
    F --> G[Deploy to Staging]
    G --> H{Staging Tests Pass?}
    H -->|No| I[Rollback Staging]
    H -->|Yes| J[Manual Approval Required]
    J --> K{Approved?}
    K -->|No| L[Deployment Cancelled]
    K -->|Yes| M[Deploy to Blue Environment]
    M --> N[Health Checks]
    N --> O{Health Checks Pass?}
    O -->|No| P[Rollback to Green]
    O -->|Yes| Q[Switch Traffic to Blue]
    Q --> R[Monitor Metrics]
    R --> S{Metrics Normal?}
    S -->|No| T[Emergency Rollback]
    S -->|Yes| U[Deployment Complete]
    
    style A fill:#e1f5fe
    style U fill:#e8f5e8
    style D fill:#ffebee
    style I fill:#ffebee
    style P fill:#ffebee
    style T fill:#ffebee
\`\`\`

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
              <DocumentRenderer
                content={selectedDocument.content}
                type={selectedDocument.type === 'diagram' ? 'mixed' : 'markdown'}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}