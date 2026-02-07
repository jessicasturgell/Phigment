# Phigment
## Overview
*Phigment* is a full-stack application designed for color palette creation and project management. Built with C#, React, and SQL Server, the app utilizes an **Explore** page that allows users to input a color in order to generate color harmonies based on that color input. Users can use these color harmonies to create and organize **Color Palettes** filled with individual **Color Swatches**. Users have access to a **My Projects** page, which allows them to plan and take notes on creative projects. **Palettes** can be linked to **Projects** for ease of access. Users can also personalize their **Profile** by showcasing their favorite palettes and projects publicly.
## Installation
### Install Dependencies:
- Install Microsoft SQL Server and Visual Studio Community.
- Ensure you have Node.js installed.

### Clone the Repository:
```
git clone https://github.com/jessicasturgell/Phigment.git
cd Phigment
```
### Open in Visual Studio:
- Open Phigment.sln in Visual Studio.

### Set up the Database:
- Open SQL Server and run the script to create the necessary tables and columns: [SQL data](https://github.com/jessicasturgell/Phigment/blob/main/01_Phigment_Create_DB.sql)
- Seed the database using this script: [SQL Seed Data](https://github.com/jessicasturgell/Phigment/blob/main/02_Phigment_Seed_Data.sql)

### Run the Application:
- In Visual Studio, click the green "Execute with Debugger" button to launch the application.

### Start the Client:
- Open a terminal, navigate to the client folder, and run:
```
npm install
npm run dev
```
### Access the Application:
- Copy the localhost link displayed in the terminal and paste it into your browser to start using the application.
