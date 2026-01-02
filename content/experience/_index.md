---
title: "Experience"
---

## Professional

**Professional software developer of {{< years-experience >}} years**

- Architected, designed, and implemented hundreds of features and improvements in enterprise SAAS systems
- Improved performance-to-cost ratio to the tune of hundreds of thousands annually via designing and leading architecture migrations (SQL Server ➔ Postgres, Windows ➔ Linux, .NET Framework ➔ .NET Core) on 1M+ LOC projects pre-AI

**Software team leader**

- Core/platform team leader of {{< lead-years-experience >}} years

## Education

**University of Victoria** - Victoria, BC, Canada - Dec 2014

- *Bachelor of Software Engineering, co-op, with distinction*

**Selkirk College** - Castlegar, BC, Canada - Apr 2010

- *Engineering University Transfer*

## Employment

**Helm Operations**

*Software Developer Team Lead* - 2017 to Present

- Served a dual role as team lead + developer on the core/platform team to accomplish:
  - **Designed, implemented, and was responsible for the commercial timeline and success of a migration of 1.4MLOC monolith codebase from .NET Framework 4.8 to .NET8**
    - this included shifting 100+ AWS Servers from Windows Server to Linux and saved the organization exorbitant amounts in cloud licensing fees which allowed the organization to invest that into scaling to reach the demands of larger enterprise customers
    - strategy included modularizing the product from ~4 C# modules to ~110 C# modules and incrementally migrating to netstandard2.0 to maintain full compatibility with .NET Framework during the move until the cutover
  - **Designed, implemented, and was responsible for migration from SQL Server to PostgreSQL**
    - this included migrating 100+ databases in AWS RDS spanning multiple regions and accounts and saved the organization massive amounts on licensing fees, allowing investment in scaling to meet the needs of large enterprises
    - included migrating 16-20 TB of servers data from SQL Server to PostgreSQL with minimal downtime
    - developed custom PostgreSQL datatype to store timestamp+offset on postgres (`DateTimeOffset` on MSSQL and C# stores 8 bytes timestamp and 2 bytes offset, white `timestamptz` on postgres is 8 bytes timestamp and baked-in offset, so a custom type is needed to store full precision and retain ability to separate the offset at runtime)
  - **Led development of hundreds of features and improvements**
    - Streaming data transfer algorithm scaling to billions of events, Multi Factor Authentication, SAML2.0 Authentication, adoption of TypeScript and Vue.js across the org, Cake build tool, HelmDeploy AWS deployment tool, shifting CI/CD to GitHub Actions, installer rearchitecture, /v2/ API pattern saving devs hundreds of hours every release, automated testing and reporting, and many more 

*Software Developer* - 2013 to 2017

- Full stack development using JS, C# (NET Framework), SQL (MSSQL), AWS
- Key member of the team that implemented a maritime industry SAAS product from the ground up
- Focus areas:
  - implemented and improved data transfer algorithms for ~4TB databases distributed to hundreds of offline nodes using strategies such as Domain Driven Design and Event Sourcing
  - implemented observability/logging via ELK (Elasticsearch, Logstash, Kibana)
  - as part of a team implemented various product lines from their inception such as Maintenance, Compliance, HSQE, Audits

**Reliable Controls Corporation**

*Co-op Software Developer* - Jan to Apr 2013

- Added a client crash reporting system to a large C++ codebase; led demo to enterprise board and adopted feedback

**Latitude Geographics Group**

*Junior Software Developer* - May to Aug 2012

- Added features to a C# map viewer including designing and adding a live-edit grid for map data; met with stakeholders and gathered requirements to iterate on design

*Quality Assurance / Quality Control* - Sep to Dec 2011

## Personal

**Hobbyist game developer and enthusiast**

- Solo projects include a MMORPG backend (.NET) which data transfers to Unreal Engine (C++) clients via completely rewritten netcode, an idle game (typescript backend, typescript frontend, k8s infrastructure on DigitalOcean), and more

**Open Source Software contributor**

- Feature contributor to Kubernetes HAProxy Ingress
- Discussion contributor to .NET runtime

**Hobbyist photographer**

- Street photography, macro photography

**Random things for fun**

- Masters league Starcraft 2 player
- Wrote/ran TwitchPlaysD2 for Diablo II

**Technologies**

C#, C++, NET, TypeScript, JavaScript, node.js, AWS, DigitalOcean, RDS, S3, EKS, DOKS, k8s, golang, Vue.js, HTML, CSS, Linux, git, GitHub Actions, PowerShell, bash, Jira, Claude Code, AI, windbg, ELK, elasticsearch, lucene, Entity Framework, ASP.NET, Cake, Jira, Confluence, Postgres, MSSQL, SCRUM, Agile

**Contact**

max.verigin@gmail.com