**SRS Speedy Wash**

**Group-13** 

-----
**Team Members:**

Aman Aggarwal, 2018327

Gavish Gupta, 2018390

Hardik Saini, 2018391

Prasham Narayan, 2018359

-----


|**Term**|**Definition**|
| :-: | :-: |
|User|Someone who interacts with mobile phone application|
|Admin|A system administrator who is given specific permission for managing and controlling the system|
|DESC|Description|
|RAT|Rational|
|DEP|Dependency|
|TAG|A unique, persistent identifier|
|GIST|A short, simple Description of the concept |
|METER|The scale of measure used by the requirement|
|MUST|The minimum level required to avoid failure|
|PLAN|The level at which success is claimed |
|WISH|A desirable level of achievement that may not be attainable through available means|
|TBD|To Be Decided|

-----
1. # Introduction
   1. ## Purpose of this Document
      1. This document contains Software requirements for the project named *Speedywash*.
      1. The purpose is to have synchronized requirements between users, clients & developers.
   1. ## Scope of this document
      1. This document specifies the requirements for the application SpeedyWash India. 
      1. The application will have a user/consumer interface and an admin interface. The user interface/application will have the following features: 
         1. Android application
         1. Customer login 						
         1. Browsing Services (such as dry cleaning, washing)		
         1. Placing an order						
         1. Tracking Order 						
         1. Payment	
         1. View/Change Profile

`			`The admin interface/application will have the following features:-

- Admin login							
- See all Orders summary.
- Manage and change the status
- Track delivery
- Add riders (for pickup and delivery)

`		`Since we have limited time on our hands, so we expect to deliver the complete admin interface and the 

The following user application services as our **prime priority**: Browsing services, placing an order, and Tracking order.

-----
1. # Overall Description
This section will provide an overview of the whole system. The system is explained in the context of how it interacts with other dependencies.
1. ## Product perspective - 
   1. The system will consist of two parts: one mobile application and one admin interface.
   1. The mobile application allows to
      1. Place orders
      1. Manage subscriptions
      1. Maintain history or previous orders
      1. Cancel orders
   1. Since the application is user-centric, it will need somewhere to store the data. A database will be hosting user and services data; the application will fetch and write to the database depending upon the interface requirement.
   1. The Admin interface allows application admin to see a list of all the orders placed, manage them, update their status, assign orders to the nearest store.
1. ## Product functions - 
With the user application, the users will search for laundry-related services and select a specific service and schedule a pickup for the same. The user will also be able to add multiple services at a time to the cart. The users will have to pay through UPI; also, the users can track their orders.

With the admin application, the admin will be able to see all orders summary. Manage and change the status of the orders. Track delivery and add riders for pickup and delivery.
1. ## User characteristics - 
   1. Two types of users will use the application: users and an administrator.
   1. The administrator will have a different application than the user. In this application, the administrator can see all order’s summary, manage and change orders’ status, add riders, and track orders’ delivery.
   1. In the user application, a user will be able to place a pickup order (including payment) after authentication and then track his/her order.
1. ## Assumptions and dependencies - 
   1. All the dependencies are mentioned in the requirements section. 
   1. Assumptions - 
      1. The user has enough hardware and software requirements to run the application.
      1. The user has allowed the app to use its current location.
      1. Active Internet connection.
1. ## Apportioning of requirements -
   1. In case of insufficient time, the first version will only contain prime-priority.
1. ## Technologies and Stack
   1. React-native and expo will be used to develop front-end and application logic (Client)
   1. Firebase will be used for storing data in backend
   1. In case where server like behaviour is required firebase-cloud functions can be used (TBD) 
   1. ReactJS will be used to develop web based admin interface (TBD)
   1. Admin interface will also be connected to firebase
-----
1. # Functional Requirements(Users)
   1. ## Authorization
      1. ID: FR1
      1. DEP: [EI1](#_4bmu1ixa5pos)
      1. At any moment, the user can be either in an **authorized** or **unauthorized** state.
         1. An authorized user will redirect to the *Homepage* screen.
      1. If the user is unauthorized, a textbox will appear in front of the user, and he/she will need to enter their contact number (this is the first screen).
         1. An unauthorized user is locked in the first screen and cannot navigate to any other screen.
      1. Once the user enters ten integer digits, a new button, “**Get** **OTP,**” will be visible.
         1. Contact number length should be >= 10.
      1. Upon clicking “Get OTP,” the entered contact number is sent to the server, the server will generate an OTP and send it to the contact number.
         1. If the user enters the wrong contact number, he/she will not receive OTP and won’t be able to complete further steps.
      1. Once the server has sent the OTP, a new text field will appear in front of the user to enter the OTP, which he/she receives on their contact number.
      1. Once the user enters the correct OTP, he/she will navigate to the ***Info screen*** if the account corresponding to the number is not present in the database. Else he will be redirected to the homepage.
         1. Correct OTP is the OTP generated by the server and sent to the user on the contact number he/she entered.
         1. If the user enters the incorrect OTP, he/she will be alerted to “**OTP mismatch**” and will be required to re-enter OTP.
      1. In the ***Info screen***, they MUST enter their name, email, and address once entered. The user will now switch from unauthorized to authorized state & will redirect to the Homepage.
         1. If any of the above fields are empty, the user won’t be allowed to navigate to any other screen.
         1. The moment the user is authorized, user details are pushed onto the database, and a session is held in local storage (AsyncStorage).
   1. ## Generic Layout
      1. ID: FR2
      1. All screens will follow this generic layout except the authorization screen.
      1. It will contain a horizontal header bar, which will hold the following buttons:
         1. SpeedyWash Icon
         1. Cart - Users can see the services they have selected.
         1. Notification icon (Bell icon): Users can see the announcements made by the admin.
      1. It will also contain a horizontal navigation bar at the bottom of the screen with the following buttons:
         1. Home - The user can click this button at any point in time to go back to the *homepage*
         1. Orders - Users can see ongoing and past orders.
         1. Profile - 
         1. Subscription -
   1. ## Homepage
      1. ID: FR3
      1. DEP: [FR1](#_oufrtljg53i4)
      1. Only an authorized user can see this page.
      1. The homepage contains a button for each of the following service:
         1. Carpet cleaning
         1. Sofa dry cleaning
         1. Premium wash
         1. Shoe cleaning
         1. Dry cleaning
         1. Steam press
         1. Wash and fold
         1. Wash and iron
         1. Washing
      1. Upon clicking any button above, the user will navigate to the **service-specific page**.
      1. One-third of vertical space will be allocated to marketing specific needs.
   1. ## Service-specific page
      1. ID: FR4
      1. DEP: [FR3](#_xxk7wutaqq3k)
      1. It will contain the price of the service and an *add to cart* option. Here users can select the quantity of the service required and can add that to the cart.
      1. After adding to the cart, the users can select more services if they want.
      1. Upon clicking *Go to cart*, the *Cart* page will be displayed.
   1. ## Cart 
      1. ID: FR5
      1. It will contain all the items selected with their respective quantity and price. Here, users can add or delete the item, and he/she can modify its quantity as well.
      1. The total price payable by the user will be shown at the bottom.
      1. Also, there will be a button that will redirect the user to the *checkout cart*.
   1. ## Checkout Cart
      1. ID: FR6
      1. DEP: [FR5](#_11wux6abx5j5)
      1. Users **MUST** select the pickup address from the saved addresses.
         1. If there are no saved addresses, the user will be shown an interface to add a new address.
         1. If the user wants to add a new address, they can add one by clicking the *Add address* button.
      1. Users will then choose their pickup date and time.
      1. Users MUST select the delivery address from the saved addresses.
         1. If the user wants to add a new address, they can add one by clicking the *Add address* button.
      1. Users will then choose their delivery date and time.
      1. Once pickup and delivery details are finalized, then the user can proceed to the payment option by clicking on the button *Proceed with payment.*
   1. ## Proceed with payment
      1. ID: FR7
      1. DEP - [EI3](#_p8gar9eyuz2p)
      1. There will be two payment options on this page - *Cash & UPI.*
      1. Once the payment details are finalized, the user can place an order by clicking on the *Place order.*
         1. If the UPI option is selected, then the UPI interface will open where the user will make the payment. As soon as the payment is confirmed, orders will be placed automatically.
         1. If the Cash mode is selected, then the order will be placed instantly.
      1. Once the order is placed, the admin will be notified with the order details. The user will also receive an email with a detailed DESC of the order. 
   1. ## Profile
      1. ID: FR8
      1. The profile page displays the profile of the user along with options:
         1. Subscription: 		 Displays list of subscribed PLANs
         1. My Orders:			 Displays history of orders placed
         1. My cards & Wallet:	 Attached cards and wallet details
         1. Pricelist:			 List of price of the services provided
         1. Manage Addresses:	 Update addresses
         1. Notifications:		 Switch on/off notifications
         1. Invite Friend:		 link to share Speedy Wash with friends.
         1. Log out: 			 switch to the unauthorized state.
      1. The user can edit his profile and update his name, profile-picture, or email.
   1. ## Orders
      1. ID: FR9
      1. There will be two options, Active orders and Past orders.
      1. Active orders will show the details of all the ongoing orders.
         1. The user will have an option to cancel an active order only if the pickup has not been done. The admin will also be notified of the canceled order. In this case, if the user has made any payment beforehand, it will be reimbursed by the admin.
      1. One can also see the current status of ongoing orders through active orders.
      1. Past orders will show the details of all the completed and canceled orders.
   1. ## Subscription
      1. ID: FR10
      1. This will display all the packages provided for different services.
1. # Functional Requirements(Admin)
   1. ## Admin Login
      1. ID: FR11
      1. Admin must login through the given user id and password.
   1. ## Homepage
      1. ID: FR12
      1. Shows the statistics of total orders, ongoing orders, etc. 
      1. Text box to push notification to the main application.
      1. Option to upload offer related banners.
   1. ## Order Specific Page
      1. ID: FR13
      1. It will show the following details of the specific order chosen-
         1. Customer ID
         1. Order type
         1. Order quantity
         1. Total Price
         1. Customer Address
         1. Store Assigned
         1. Current Status
         1. Order Date and Time
         1. Payment Mode
      1. An option to cancel the order.


-----
1. # External Interfaces
   1. ## Authentication: 
      1. ID: EI1
      1. *firebase.auth()* is used to provide authentication using a phone number. 
      1. The firebase servers generate an OTP and send it to the number that is used in number verification.
   1. ## Locate User
      1. ID: EI2
      1. Google maps API will be used to locate the user.
   1. ## Payment
      1. ID: EI3
      1. We will set up UPI for payments.
-----
1. # Performance Requirements
   1. ## UI response Time
      1. ID: PR1
      1. TAG: UiResponseTime
      1. METER: Measurements obtained from the 1000 searches during testing.
      1. MUST: No more than 2 seconds, 100% of the time.
      1. WISH: No more than 1 second, 100% of the time.
   1. ## Database response time
      1. ID: PR2
      1. TAG: DatabaseResponseTime
      1. METER: Measurements obtained from the 1000 requests during testing.
      1. MUST: No more than 4 seconds, 99% of the time.
      1. PLAN: No more than 2 seconds, 99% of the time.
      1. WISH: No more than 1 second, 100% of the time.
   1. ## Location Fetch time
      1. ID: PR3
      1. TAG: LocationFetchTime
      1. METER: Measurements obtained from 1000 location retrievals during testing.
      1. MUST: No more than 5 seconds, 98% of the time.
      1. PLAN: No more than 3 seconds, 98% of the time.
      1. WISH: No more than 2 seconds, 100% of the time.
-----
1. # Design constraints
   1. ## Hard drive Space:
      1. ID: DC1
      1. TAG: HardDriveSpace
      1. GIST: Application’s need for hard drive space.
      1. METER: Megabytes
      1. MUST: No more than 250 MB.
      1. PLAN: No more than 200 MB.
      1. WISH: No more than 150 MB.
   1. ## Application memory usage
      1. ID: DC2
      1. TAG: ApplicationMemoryUsage
      1. GIST: The amount of operating system memory required by the application.
      1. METER: Megabytes.
      1. MUST: No more than 300 MB.
      1. PLAN: No more than 250 MB.
      1. WISH: No more than 200 MB.
-----
1. # Non-Functional Attributes
   1. ## Availability -
      1. ID: NF1
      1. TAG: SystemAvailability
      1. GIST: Availability of the system when it is used; the application MUST be connected to the internet.
      1. METER: Measurements obtained from 20 hours of usage during testing.
      1. MUST: More than 98% of the time.
      1. PLAN: More than 99% of the time.
      1. WISH: 100% of the time.
   1. ## Maintainability - 
      1. Title: SystemMaintainability
      1. DESC: The application should be easy to extend and test. The code should be easy to understand with proper documentation. Moreover, some testing environments should be set up to test different functions of the application.
      1. RAT: Implementations of future functions should be simple, and a testing environment is necessary to test the application.
   1. ## Portability - 
      1. Title: SystemPortability
      1. DESC: The application should be portable with Android.
      1. RAT: Adaptable platform for the application to run on.
   1. ## Security - 
      1. TAG: SystemSecurity
      1. GIST: The security of the system while logging in and making payments.
      1. METER: Measurements obtained from 20 hours of usage during testing.
      1. MUST: More than 95% of the time.
      1. PLAN: More than 98% of the time.
      1. WISH: 100% of the time.
   1. ## Reliability - 
      1. TAG: SystemReliability
      1. GIST: The reliability of the system.
      1. METER: Measurements obtained from 20 hours of usage during testing.
      1. MUST: More than 90% of the time.
      1. PLAN: More than 94% of the time.
      1. WISH: More than 97% of the time.
-----
1. # Preliminary schedule & budget


|**ID**|**Dependencies**|**Description**|**Release**|**Duration(Team hrs)**|
| :-: | :-: | :-: | :-: | :-: |
|FR1|EI1|Authorization|1|7|
|FR2||Generic Layout|1|3|
|FR3|FR1|Home Page|1|5|
|FR4|FR3|Service-specific Page|1|5|
|FR5||Cart|2|4|
|FR6|FR5|Checkout Cart|2|6|
|FR7|EI3|Proceed with payment|2|3|
|FR8||Profile|2|4|
|FR9||Order|3|3|
|FR10||Subscription|3|2|
|FR11||Admin Login|3|2|
|FR12||Admin HomePage|3|6|
|FR13||Orders Specific Page|3|8|
|EI1||Authentication|1|2|
|EI2||Locate user|2|7|
|EI3||Payment|2|9|
|PR1||UI response time|4|\*|
|PR2||Database response time|4|\*|
|PR3||Location fetch time|4|\*|
|DC1||Hard drive space|4|\*|
|DC2||Application memory usage|4|\*|
|NF1||Availability|4|\*|

**Budget:** Since the initial user base is estimated around 1000 users, no additional funds are required.

-----
1. # Acceptance Criteria
   1. Authorization
   1. Payment
   1. Locate Users
   1. Cart
   1. Profile Page
   1. Home Page
-----

















Summary of Meetings with Users/Sponsors

- Meeting 1:
  - 6th February 2021, All team members and sponsors attend the meeting
  - Duration: 35-40 minutes 
  - Main points of discussion:
    - Number of users
    - Payment 
    - Login interface
    - Location system
    - Subscription system
    - Express order system
    - Email Billings
  - Estimate of how much of the duration the sponsor/users spoke in the meeting: 15-20 minutes
  - Estimate of how much of the duration you/your team members spoke in the meeting: 15-20 minutes

- Meeting 2:
  - 10th February 2021, All team members and sponsors attend the meeting.
  - Duration: 25-30 minutes
  - Main points of discussion:
    - Sponsor gave feedback on the initial draft.
    - Prioritization of the functionalities.
    - Admin interface.
    - Went through some examples of admin interfaces available online.
  - Estimate of how much of the duration the sponsor/users spoke in the meeting: 15-20 minutes
  - Estimate of how much of the duration you/your team members spoke in the meeting: 10-15 minutes



- Meeting 3: SRS Review Meeting
  - 13th February 2021, All team members and sponsors attended the meeting
  - Duration: 25-30 minutes
  - Size of SRS being reviewed : 8
  - Method of review used: Discussed on a test scenario
  - List of key issues identified: 
    - Admin Interface scalability
    - Advertisements
    - Daily report
  - Note: Since we already had a discussion on our initial draft, most of the concerns were handled beforehand.





PAGE