---
title: "BigQuery: Advanced Data Management on GCP"
layout: post
date: 2025-02-28
image: "bigquery-gcp.png"
categories: ["Data Engineering", "Cloud Computing", "GCP"]
---


<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
  
  body {
      font-family: 'Open Sans', sans-serif;
  }

  h1 {
    font-family: 'Roboto', sans-serif;
    color: #007bff;
    margin-top: 30px;
  }

  h3 {
    font-family: 'Roboto', sans-serif;
    color: #007bff;
    margin-top: 30px;
  }

  h4 {
    font-family: 'Roboto', sans-serif;
    color: #EA950B;
    margin-top: 30px;
  }

  pre {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
  }

  h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
    content: none !important;
    display: none !important;
  }
</style>


### Introduction
BigQuery is a fully managed, serverless data warehouse on Google Cloud Platform that enables ultra-fast SQL queries on large volumes of data. In this post, we'll explore BigQuery's latest advances in data organization, management, and optimization, focusing on namespace usage, different table types, industrialization and refactoring, schema management, and access control.

### 1. Namespaces
Namespaces are essential for organizing and understanding data structure, especially when data volume becomes challenging to manage.

#### Definition
A namespace helps contextualize data and facilitates team collaboration.

#### Use Case: Dark Launch
- **Context:** Testing new algorithms without impacting production.
- **Example:** Creating datasets like `gold_data_new` or `gold_data_algorithm_test`.
- **Benefits:**
  - Avoids long pull requests.
  - Facilitates data comparison between environments.

#### Use Case: Concurrent Work
- **Context:** Allows multiple developers to work simultaneously on the same data during development.
- **Example:** Using Dataform to manage namespaces, although DBT requires more manual configuration.
- **Benefits:**
  - Enhanced collaboration.
  - Reduced conflicts in development environment.

### 2. Table Types
BigQuery offers several table types suited for different use cases:

#### Clone
- **Description:**  
  A table copy that doesn't consume additional space until data changes. Only modifications (insertions, updates) are counted in storage.
- **Use Case:**  
  Enables development and testing on production data copy without duplicating storage costs.

#### Snapshot
- **Description:**  
  A point-in-time image of a table, immutable and ideal for maintaining history.
- **Differences from Clone:**  
  - **Clone:** Can be modified after creation.  
  - **Snapshot:** Immutable, allowing return to a precise previous state.

#### Time Travel
- **Feature:**  
  Enables returning to a previous data state using features leveraged by clones and snapshots.

#### External Table
- **Description:**  
  Allows querying data stored outside BigQuery, such as files in Google Cloud Storage or Google Sheets.
- **Use Case:**  
  Directly read a Google Sheet or query files stored in various storage environments.

#### Materialized View
- **Description:**  
  A view with pre-calculated and stored results, optimizing query performance.
- **Benefits:**
  - Cost reduction.
  - Stable consumption interface.
  - Possibility to use **query routing** for improved performance.

```sql
-- Example of creating a materialized view
CREATE MATERIALIZED VIEW my_dataset.my_materialized_view AS
SELECT column1, COUNT(*) AS count
FROM my_dataset.my_table
GROUP BY column1;
```

### 3. Industrialization and Refactoring
Industrialization enables structured evolution and refactoring of a data system.

- **Namespace Usage:**
  Separate test and production environments to facilitate collaborative development.
- **Dark Launch:**
  Test new versions in production without impacting existing environment.
- **Benefits:**
  Safer and iterative deployments.
  Improved collaboration between development and operations teams.