# project2
CRUD Project => Programming Project Showcase

DESCRIPTION: To create an application that features a database of student projects, that can be leveraged to showcase them to the public, recruiters, enthusiasts, and other developers. 

***User Stories***
1) Mission Statement: Provide a platform where users can upload and share their latest programming work AND talent seekers can view projects of up and coming developers

2) HOME 
    - Provide a link for users to log-in or register. 
    - Display website mission statement 
    - Users can either create an account to upload their work OR browse existing content
        
3) Create Account
    - User will be able to create an account with the following information
    - Username / Password
    - firstName / lastName
    - email address
    - Personal Website URL
    - Location
    - Personal Summary or Description & Experience
    - After account is created, redirect to new account page
        
4) New Account page 
    - Show session message acknowledging account creation
    - Provide link for user to EDIT their existing user page
    - Page will feature buttons that allow the user to create/edit/remove content from their index
    - User will be able to click on their existing projects to view the project show page
    
5) Account Edit Page
    - Users will have access to an account editing page where they can edit/update their existing account info
    - Once edits are complete, redirect to User Show Page
    
6) Create Project Showcase
    - User will be able to enter information outlined in project model
        - Project Name
        - Project Description
        - Project Link
        - Github (or other repo)
        - Pictures!!!

7) Users Index
    - Users and non-users will have the ability to view existing users in the Users index page
    - This will provide a list of all existing users in the database, which can be accessed to provide that users projects and information
        
8) User Show Page / Project Index
    - User information from step 3 is displayed
    - List of user projects and links displayed
    - User will be able to select a specific project, which will redirect you to the project show page

9) Project Show page
    - This page will show information from the project model as well as a link to visit the deployed project
        - Project Name
        - Project Description
        - Project Link
        - Github (or other repo)
        - Pictures!!!
    - Note: Links will direct users to an external site where project is hosted
    - Site visitors will have access to go back to the user page / project index
    - User will have an option for editing their existing project
    
10) Project Edit Page
    - User will be able to edit/update their project information
    - After Project edits are complete, redirect to project show page
    
TECHNOLOGIES USED:
    - Node
    - Express
    - Mongo
    - Mongoose
    - HTML / CSS / JavaScript
    - EJS
    - Express Sessions
    - BCryptJS
    - Body-Parser
    - Method_Override
    



