ANNEXURE 1 : USER INTERFACE SCREENS 
1.1 Login Screen
<img width="854" height="932" alt="image" src="https://github.com/user-attachments/assets/df03403d-1ad8-4cd0-819b-7e5791666e89" />

 
1.2 Register Screen 
<img width="713" height="1235" alt="image" src="https://github.com/user-attachments/assets/c05269c6-a521-4238-b331-612434ee792b" />

 
1.3 Dashboard
<img width="760" height="1352" alt="image" src="https://github.com/user-attachments/assets/8b3dddd3-6926-418e-92db-52c0718a6777" />


1.4 Server Page
<img width="687" height="1341" alt="image" src="https://github.com/user-attachments/assets/dd5c998d-f007-4fe5-9304-365bfdc30c1f" />


1.5 Add Server
<img width="604" height="544" alt="image" src="https://github.com/user-attachments/assets/f764dbe4-4569-440c-898b-72c60a6d9554" />


1.6 Server Details
<img width="721" height="669" alt="image" src="https://github.com/user-attachments/assets/53f10189-b957-4468-a8d6-ba0d395d927e" />


1.7 Alerts Page
<img width="751" height="1335" alt="image" src="https://github.com/user-attachments/assets/4657dec5-38ef-4994-82ec-d6b60ef323f2" />

 
1.8 History Page
<img width="754" height="1340" alt="image" src="https://github.com/user-attachments/assets/439a5ffe-7cbc-4ca9-9fe7-d8a1923e12e3" />


1.9 Profile Settings
<img width="940" height="878" alt="image" src="https://github.com/user-attachments/assets/a3896f92-7fe2-4753-85c2-f5060dd5a619" />
 

1.10 Server Settings
<img width="954" height="831" alt="image" src="https://github.com/user-attachments/assets/a3f69b9f-7b7a-46a6-82fd-3a1d6480404a" />

 
1.11 Alert Thresholds Settings
<img width="863" height="1267" alt="image" src="https://github.com/user-attachments/assets/a6fbf2fc-4b8d-45ee-8850-da8dd5eb9012" />


1.12 Notification Settings
<img width="849" height="1320" alt="image" src="https://github.com/user-attachments/assets/c31c34a5-25d7-4e75-9fd8-4632dc0356d0" />

 
1.13 Team Access Settings 
<img width="945" height="865" alt="image" src="https://github.com/user-attachments/assets/63d3037d-8844-4d84-bac2-da80e57f80a2" />
 
 
1.14 System Settings
<img width="916" height="1045" alt="image" src="https://github.com/user-attachments/assets/60d1d87a-1127-4d63-8719-df3ac91d804a" />

**Chapter 1: Introduction**


**1.1 Project Abstract**


ServerPulse is a real-time multi-server monitoring system used to monitor remote servers from a centralized dashboard. Lightweight agents installed on AWS EC2 servers collect system metrics such as CPU usage, RAM usage, disk usage, uptime, and network activity, and send them to the backend server at regular intervals.
The backend processes the data, stores it in MongoDB Atlas, generates alerts when thresholds are exceeded, and sends live updates to the frontend dashboard using Socket.IO. The system also provides historical charts, role-based authentication, alert management, and server management features.
The project is deployed using Docker, Jenkins CI/CD pipeline, AWS EC2, and Nginx reverse proxy, making it a complete full-stack and DevOps-based monitoring solution.


**1.2 Existing System and Need of System**


**Existing System**


Traditional server monitoring is often manual and lacks centralized real-time visibility. Many existing systems are expensive, difficult to configure, or do not provide live monitoring and alerting for multiple servers.

Most small organizations and educational environments do not have access to affordable infrastructure monitoring platforms with real-time analytics and cloud deployment support.


**Need of Proposed System**

Modern cloud infrastructure requires continuous monitoring to detect issues quickly and improve server performance. There is a need for a centralized monitoring system that can:

•	monitor multiple servers, 

•	provide live updates, 

•	generate alerts, 

•	store historical data, 

•	and support cloud deployment. 

ServerPulse fulfils these requirements through a distributed monitoring architecture with real-time communication and automated deployment.

 
**1.3 Scope of Work**

The scope of ServerPulse includes development of a centralized real-time server monitoring platform capable of monitoring multiple remote systems deployed across cloud infrastructure.

The project covers the following functionalities:

•	Real-time collection of server health metrics 

•	Monitoring CPU, RAM, disk usage, uptime, network traffic, and processes 

•	Distributed agent-based monitoring architecture 

•	Multi-server centralized dashboard 

•	Live data updates using WebSocket communication 

•	Historical analytics and graphical reports 

•	Alert generation based on configurable thresholds 

•	Role-based authentication and authorization 

•	Server management and monitoring controls 

•	Docker-based containerization 

•	Jenkins CI/CD automation pipeline 

•	Deployment on AWS EC2 cloud infrastructure 

•	Reverse proxy implementation using Nginx 

The project mainly focuses on infrastructure monitoring, cloud deployment, and DevOps integration for educational and practical demonstration purposes.


**1.4 Operating Environment – Hardware and Software**

**Hardware Requirements**

Processor --	Intel i5 / Ryzen 5 or above

RAM --	Minimum 8 GB

Storage --	Minimum 20 GB free space

Network --	Stable Internet Connection

Cloud Infrastructure --	AWS EC2 Linux Instances

 
**Software Requirements**

Ubuntu Linux --	Server Operating System

Node.js	-- Backend and Agent Runtime

Express.js --	Backend Framework

MongoDB Atlas --	Cloud Database

Socket.IO --	Real-time Communication

Docker --	Containerization

Jenkins --	CI/CD Automation

Nginx	-- Reverse Proxy Server

Git & GitHub	-- Version Control

Visual Studio Code --	Development Environment

Chart.js	-- Data Visualization

Chrome Browser	-- Frontend Access

**1.5 Technology Used**

<img width="764" height="546" alt="image" src="https://github.com/user-attachments/assets/3fc35ed0-8b54-4e4f-aa8a-27e1b4dc8e26" />


**1.6 Module Specification**

<img width="770" height="797" alt="image" src="https://github.com/user-attachments/assets/cb6bd2b5-ee15-466e-91a6-1f26025c8ce8" />


**1.7 	SDG Goals**

SDG Goals Aligned with ServerPulse

SDG 8 – Decent Work and Economic Growth

ServerPulse improves system reliability and reduces server downtime through real-time monitoring and automated alerts. This helps organizations maintain stable digital infrastructure and improve operational efficiency.

SDG 9 – Industry, Innovation and Infrastructure

The project supports modern digital infrastructure by implementing cloud-based distributed monitoring using AWS EC2, Docker, Jenkins, and real-time analytics technologies.

SDG 12 – Responsible Consumption and Production

By monitoring CPU, RAM, disk, and resource utilization, ServerPulse helps optimize server resource usage and reduce unnecessary infrastructure wastage.


 
**Chapter 2: Analysis & Design**


**2.1 Entity Relationship Diagram (ERD)**

<img width="778" height="1214" alt="image" src="https://github.com/user-attachments/assets/c839f0d5-a189-4cc3-9153-81d1302b7eab" />
 
 
**2.2 Use Case Diagram**

<img width="940" height="1049" alt="image" src="https://github.com/user-attachments/assets/85918c3e-925d-4be7-b499-732c6b735489" />
 
 
**2.3 Class Diagram**

<img width="940" height="672" alt="image" src="https://github.com/user-attachments/assets/9e6059bf-78bc-43f8-b1a9-3d50290ff2c4" />


**2.4 Activity Diagram**

**2.4.1 Admin**

<img width="868" height="1304" alt="image" src="https://github.com/user-attachments/assets/5a426c65-cf9f-46d2-ab0f-d47236a197fe" />

 
**2.4.2 Viewer**
 
<img width="565" height="1357" alt="image" src="https://github.com/user-attachments/assets/6cc76b00-402b-4739-add3-ad239a178964" />

 
**2.5 DFD Diagram**
 
<img width="777" height="1307" alt="image" src="https://github.com/user-attachments/assets/bcb9658b-538a-4651-8a57-2321138073dd" />

 
**2.6 Sequence Diagram**

<img width="940" height="1131" alt="image" src="https://github.com/user-attachments/assets/26bd1da5-2144-4915-af76-a78916f9149c" />

 
**2.7 Table Structure**

**Table 2.7.1 – User**

<img width="770" height="317" alt="image" src="https://github.com/user-attachments/assets/d2702c8f-d78e-4293-9705-22d6ad9dd6ef" />


**Table 2.7.2 – Server**

<img width="764" height="442" alt="image" src="https://github.com/user-attachments/assets/235da710-3d3d-4204-8094-002493918329" />

 
**Table 2.7.3 – Metrics**

<img width="671" height="458" alt="image" src="https://github.com/user-attachments/assets/755225c1-409f-4594-a3be-faaa9a24c2e3" />


**Table 2.7.4 – Alerts**

<img width="740" height="373" alt="image" src="https://github.com/user-attachments/assets/430bc1e3-83e9-4bd4-b6cc-36aa56791d82" />

 
**Chapter 3: Results**

**3.1 System Implementation Result**

ServerPulse was successfully implemented as a real-time distributed server monitoring platform capable of monitoring multiple remote servers simultaneously. Monitoring agents deployed on AWS EC2 instances continuously collected server metrics and transmitted them to the centralized backend server.
The system successfully monitored:

•	CPU usage

•	RAM usage

•	Disk usage

•	Uptime

•	Network activity

•	Active processes

The backend processed the incoming data and displayed live updates on the frontend dashboard using Socket.IO.


**3.2 Real-Time Dashboard Result**

The dashboard successfully displayed real-time monitoring information for multiple servers through dynamic server cards and live charts.
The dashboard provided:

•	Live CPU, RAM, and disk utilization

•	Server status indicators

•	Alert notifications

•	Historical performance graphs

•	Real-time updates without page refresh

Color-coded indicators were used to identify healthy, warning, and critical server states.

**3.3 Alert System Result**

The alert system successfully generated alerts whenever server resource usage exceeded predefined threshold values.

The system generated:

•	Warning alerts

•	Critical alerts

•	Browser notifications

•	Sound notifications

Alerts were displayed instantly on the dashboard and stored in MongoDB for historical reference.


**3.4 Historical Analytics Result**

The system successfully stored historical monitoring data in MongoDB Atlas and displayed graphical reports using Chart.js.

Historical analytics included:

•	CPU utilization trends

•	RAM usage trends

•	Disk usage trends

•	Time-based performance visualization

The graphs updated dynamically based on selected server and time range.


**3.5 Authentication and Authorization Result**

JWT-based authentication and role-based access control were implemented successfully.

Two user roles were supported:

•	Admin

•	Viewer

Administrators could manage servers, users, and configurations, while viewers were limited to monitoring and visualization features.


**3.6 Cloud Deployment and CI/CD Result**

The application was successfully deployed on AWS EC2 infrastructure using Docker containers and Nginx reverse proxy.

A Jenkins CI/CD pipeline was implemented to automate:

•	Code integration

•	Docker image build

•	Deployment process

The pipeline reduced manual deployment effort and improved deployment consistency.


**3.7 Overall System Result**

The final implementation of ServerPulse successfully demonstrated:

•	Real-time distributed monitoring

•	Multi-server management

•	Cloud deployment

•	DevOps automation

•	Live analytics and alerts

•	Role-based security

The project achieved its objective of building a scalable and production-oriented server monitoring solution using modern full-stack and DevOps technologies.

 
**Chapter 4: Drawbacks and Limitations**


Although ServerPulse provides real-time monitoring and centralized server management, the system still has certain limitations.

**1.	Security Limitations**

Currently, browser notifications require HTTPS deployment for full support in modern browsers. Since the system is presently accessed using a public IP over HTTP during development, certain browser security features remain restricted.

**2.	Dependency on Internet Connectivity**

The system relies on continuous internet connectivity for real-time communication between monitoring agents, backend services, and the dashboard. Any network interruption may temporarily affect live monitoring updates.

**3.	Manual Agent Configuration**

Monitoring agents must currently be configured and deployed manually on each remote server. This process may become time-consuming when managing a large number of servers.

**4.	Data Storage Growth**

Since server metrics are collected continuously, historical monitoring data can grow rapidly over time and may require database optimization or archival mechanisms in future versions.

**5.	Limited Enterprise Features**

Advanced enterprise monitoring capabilities such as AI-based anomaly detection, auto-scaling, predictive analytics, and centralized log analysis are not included in the current implementation.

Despite these limitations, the system successfully demonstrates a scalable and practical real-time monitoring architecture.

 
**Chapter 5: Proposed Enhancement**

Several enhancements can be added in future versions of ServerPulse to improve functionality and scalability.

**1.	Secure HTTPS Deployment**

Future versions of ServerPulse can implement HTTPS and domain-based deployment to improve security, browser compatibility, and production readiness.

**2.	Advanced Notification System**

Additional notification methods such as email alerts, SMS notifications, and mobile push notifications can be integrated for faster incident response.

**3.	AI-Based Monitoring**

Machine learning and AI-based anomaly detection can be implemented to predict server failures and identify unusual system behavior automatically.

**4.	Automated Server Discovery**

Automatic server registration and agent installation can be added to simplify infrastructure management in large-scale environments.

**5.	Container & Kubernetes Monitoring**

Future enhancements may include support for Docker container monitoring and Kubernetes cluster monitoring for cloud-native infrastructure.

**6.	Mobile Application Support**

A dedicated mobile application can be developed to allow administrators to monitor infrastructure remotely from smartphones and tablets.

These enhancements can transform ServerPulse into a more enterprise-level cloud monitoring platform.

 
**Chapter 6: Conclusion**

ServerPulse successfully demonstrates the development of a real-time distributed server monitoring system using modern full-stack and DevOps technologies. The project provides centralized monitoring of multiple remote servers through lightweight monitoring agents deployed on AWS EC2 instances.
The system continuously monitors important server metrics such as CPU usage, RAM usage, disk usage, uptime, and network activity, while displaying live updates on an interactive dashboard using Socket.IO. Features such as historical charts, alert generation, authentication, and role-based access control further improve the functionality and usability of the platform.
The integration of Docker, Jenkins, AWS EC2, MongoDB Atlas, and Nginx enables automated deployment, cloud hosting, and scalable infrastructure management. The project also demonstrates practical implementation of CI/CD automation, cloud deployment, and real-time communication in a production-oriented environment.
Overall, ServerPulse combines server monitoring, real-time analytics, cloud deployment, and DevOps practices into a single integrated solution, making it a practical and efficient infrastructure monitoring platform.

 
**Chapter 7: Bibliography**

1.	Ethan Brown. Web Development with Node and Express. O’Reilly Media.

2.	Kristina Chodorow. MongoDB: The Definitive Guide. O’Reilly Media.

3.	Nigel Poulton. Docker Deep Dive. Leanpub Publications.

4.	Node.js Official Documentation.

5.	Express.js Official Documentation.

6.	MongoDB Atlas Documentation.

7.	Socket.IO Documentation.

8.	AWS EC2 Documentation.

9.	Jenkins Documentation..	Nginx Documentation.
 
