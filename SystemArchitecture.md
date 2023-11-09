# Auto Mate Architecture

This document describes the overall system architecture of the Auto Mate Web Application.

## High-level Component Diagram

![High-level component diagram](High-Level_ComponentDiagram.png)

In the Auto Mate application, the user is able to use the web interface/browser to send requests to the web server, the web server then transfer requests to the frontend app. When the frontend app receives the requests, it will make requests to the backend server for data. The backend server will process the requests and access the database to retrieve/modify the data, and send data back to frontend. The frontend will receive the data and send them back to the web server to send responses to user on the web interface.

## Entity Diagram

