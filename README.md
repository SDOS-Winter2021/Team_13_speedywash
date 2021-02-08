# **SRS Speedy Wash**

**Group-13**

![](RackMultipart20210208-4-cy7mg7_html_fdca79ed2642d321.gif)

**Team Members:**

Aman Aggarwal, 2018327

Gavish Gupta, 2018390

Hardik Saini, 2018391

Prasham Narayan, 2018359

![](RackMultipart20210208-4-cy7mg7_html_fdca79ed2642d321.gif)

| **Term** | **Definition** |
| --- | --- |
| User | Someone who interacts with mobile phone application |
| Admin | A system administrator who is given specific permission for managing and controlling the system |
| DESC | Description |
| RAT | Rational |
| DEP | Dependency |
| TAG | A unique, persistent identifier |
| GIST | A short, simple Description of the concept |
| METER | The scale of measure used by the requirement |
| MUST | The minimum level required to avoid failure |
| PLAN | The level at which success is claimed |
| WISH | A desirable level of achievement that may not be attainable through available means |

1.
## Introduction

  1.
## Purpose of this Document

    1. This document contains Software requirements for the project named _Speedywash_.
    2. The purpose is to have synchronized requirements between users, clients &amp; developers.
  2.
## Scope of this document

    1. This document specifies the requirements for the application SpeedyWash India.
    2. The application will have a user/consumer interface and an admin interface. The user interface/application will have the following features:
      - Android application
      - Customer login
      - Browsing Services (such as dry cleaning, washing)
      - Placing an order
      - Tracking Order
      - Payment
      - View/Change Profile

The admin interface/application will have the following features:-

- Admin login
- See all Orders summary.
- Manage and change the status
- Track delivery
- Add riders (for pickup and delivery)

Since we have limited time on our hands, so we expect to deliver the complete admin interface and the

The following user application services as our **prime priority** : Browsing services, placing an order, and Tracking order.

![](RackMultipart20210208-4-cy7mg7_html_fdca79ed2642d321.gif)

1.
## Overall Description

This section will provide an overview of the whole system. The system is explained in the context of how it interacts with other dependencies.

1.
## Product perspective -

  1. The system will consist of two parts: one mobile application and one admin interface.
  2. The mobile application allows to
    1. Place orders
    2. Manage subscriptions
    3. Maintain history or previous orders
    4. Cancel orders
  3. Since the application is user-centric, it will need somewhere to store the data. A database will be hosting user and services data; the application will fetch and write to the database depending upon the interface requirement.
  4. The Admin interface allows application admin to see a list of all the orders placed, manage them, update their status, assign orders to the nearest store.
2.
## Product functions -

With the user application, the users will search for laundry-related services and select a specific service and schedule a pickup for the same. The user will also be able to add multiple services at a time to the cart. The users will have to pay through UPI; also, the users can track their orders.

With the admin application, the admin will be able to see all orders summary. Manage and change the status of the orders. Track delivery and add riders for pickup and delivery.

1.
## User characteristics -

  1. Two types of users will use the application: users and an administrator.
  2. The administrator will have a different application than the user. In this application, the administrator can see all order&#39;s summary, manage and change orders&#39; status, add riders, and track orders&#39; delivery.
  3. In the user application, a user will be able to place a pickup order (including payment) after authentication and then track his/her order.
2.
## Assumptions and dependencies -

  1. All the dependencies are mentioned in the requirements section.
  2. Assumptions -
    1. The user has enough hardware and software requirements to run the application.
    2. The user has allowed the app to use its current location.
    3. Active Internet connection.
3.
## Apportioning of requirements -

  1. In case of insufficient time, the first version will only contain prime-priority.

![](RackMultipart20210208-4-cy7mg7_html_fdca79ed2642d321.gif)

1.
## Functional Requirements

  1.
## Authorization

    1. ID: FR1
    2. DEP: [EI1](#_4bmu1ixa5pos)
    3. At any moment, the user can be either in an **authorized** or **unauthorized** state.
      - An authorized user will redirect to the _Homepage_ screen.
    4. If the user is unauthorized, a textbox will appear in front of the user, and he/she will need to enter their contact number (this is the first screen).
      - An unauthorized user is locked in the first screen and cannot navigate to any other screen.
    5. Once the user enters ten integer digits, a new button, &quot; **Get**** OTP,**&quot; will be visible.
      - Contact number length should be \&gt;= 10.
    6. Upon clicking &quot;Get OTP,&quot; the entered contact number is sent to the server, the server will generate an OTP and send it to the contact number.
      - If the user enters the wrong contact number, he/she will not receive OTP and won&#39;t be able to complete further steps.
    7. Once the server has sent the OTP, a new text field will appear in front of the user to enter the OTP, which he/she receives on their contact number.
    8. Once the user enters the correct OTP, he/she will navigate to the _ **Info screen** _ if the account corresponding to the number is not present in the database. Else he will be redirected to the homepage.
      - Correct OTP is the OTP generated by the server and sent to the user on the contact number he/she entered.
      - If the user enters the incorrect OTP, he/she will be alerted to &quot; **OTP mismatch**&quot; and will be required to re-enter OTP.
    9. In the _ **Info screen** _, they MUST enter their name, email, and address once entered. The user will now switch from unauthorized to authorized state &amp; will redirect to the Homepage.
      - If any of the above fields are empty, the user won&#39;t be allowed to navigate to any other screen.
      - The moment the user is authorized, user details are pushed onto the database, and a session is held in local storage (AsyncStorage).
  2.
## Generic Layout

    1. ID: FR2
    2. All screens will follow this generic layout except the authorization screen.
    3. It will contain a horizontal header bar, which will hold the following buttons:
      - SpeedyWash Icon
      - Cart - Users can see the services they have selected.
      - Notification icon (Bell icon): Users can see the announcements made by the admin.
    4. It will also contain a horizontal navigation bar at the bottom of the screen with the following buttons:
      - Home - The user can click this button at any point in time to go back to the _homepage_
      - Orders - Users can see ongoing and past orders.
      - Profile -
      - Subscription -
  3.
## Homepage

    1. ID: FR3
    2. DEP: [FR1](#_oufrtljg53i4)
    3. Only an authorized user can see this page.
    4. The homepage contains a button for each of the following service:
      - Carpet cleaning
      - Sofa dry cleaning
      - Premium wash
      - Shoe cleaning
      - Dry cleaning
      - Steam press
      - Wash and fold
      - Wash and iron
      - Washing
    5. Upon clicking any button above, the user will navigate to the **service-specific page**.
    6. One-third of vertical space will be allocated to marketing specific needs.
  4.
## Service-specific page

    1. ID: FR4
    2. DEP: [FR3](#_xxk7wutaqq3k)
    3. It will contain the price of the service and an _add to cart_ option. Here users can select the quantity of the service required and can add that to the cart.
    4. After adding to the cart, the users can select more services if they want.
    5. Upon clicking _Go to cart_, the _Cart_ page will be displayed.
  5.
## Cart

    1. ID: FR5
    2. It will contain all the items selected with their respective quantity and price. Here, users can add or delete the item, and he/she can modify its quantity as well.
    3. The total price payable by the user will be shown at the bottom.
    4. Also, there will be a button that will redirect the user to the _checkout cart_.
  6.
## Checkout Cart

    1. ID: FR6
    2. DEP: [FR5](#_11wux6abx5j5)
    3. Users **MUST** select the pickup address from the saved addresses.
      - If there are no saved addresses, the user will be shown an interface to add a new address.
      - If the user wants to add a new address, they can add one by clicking the _Add address_ button.
    4. Users will then choose their pickup date and time.
    5. Users MUST select the delivery address from the saved addresses.
      - If the user wants to add a new address, they can add one by clicking the _Add address_ button.
    6. Users will then choose their delivery date and time.
    7. Once pickup and delivery details are finalized, then the user can proceed to the payment option by clicking on the button _Proceed with payment._
  7.
## Proceed with payment

    1. ID: FR7
    2. DEP - [EI3](#_p8gar9eyuz2p)
    3. There will be two payment options on this page - _Cash &amp; UPI._
    4. Once the payment details are finalized, the user can place an order by clicking on the _Place order._
      - If the UPI option is selected, then the UPI interface will open where the user will make the payment. As soon as the payment is confirmed, orders will be placed automatically.
      - If the Cash mode is selected, then the order will be placed instantly.
    5. Once the order is placed, the admin will be notified with the order details. The user will also receive an email with a detailed DESC of the order.
  8.
## Profile

    1. ID: FR8
    2. The profile page displays the profile of the user along with options:
      - Subscription: Displays list of subscribed PLANs
      - My Orders: Displays history of orders placed
      - My cards &amp; Wallet: Attached cards and wallet details
      - Pricelist: List of price of the services provided
      - Manage Addresses: Update addresses
      - Notifications: Switch on/off notifications
      - Invite Friend: link to share Speedy Wash with friends.
      - Log out: switch to the unauthorized state.
    3. The user can edit his profile and update his name, profile-picture, or email.
  9.
## Orders

    1. ID: FR9
    2. There will be two options, Active orders and Past orders.
    3. Active orders will show the details of all the ongoing orders.
      - The user will have an option to cancel an active order only if the pickup has not been done. The admin will also be notified of the canceled order. In this case, if the user has made any payment beforehand, it will be reimbursed by the admin.
    4. One can also see the current status of ongoing orders through active orders.
    5. Past orders will show the details of all the completed and canceled orders.
  10.
## Subscription

    1. ID: FR10
    2. This will display all the packages provided for different services.

![](RackMultipart20210208-4-cy7mg7_html_fdca79ed2642d321.gif)

1.
## External Interfaces

  1.
## Authentication:

    1. ID: EI1
    2. _firebase.auth()_ is used to provide authentication using a phone number.
    3. The firebase servers generate an OTP and send it to the number that is used in number verification.
  2.
## Locate User

    1. ID: EI2
    2. Google maps API will be used to locate the user.
  3.
## Payment

    1. ID: EI3
    2. We will set up UPI for payments.

![](RackMultipart20210208-4-cy7mg7_html_fdca79ed2642d321.gif)

1.
## Performance Requirements

  1.
## UI response Time

    1. ID: PR1
    2. TAG: UiResponseTime
    3. METER: Measurements obtained from the 1000 searches during testing.
    4. MUST: No more than 2 seconds, 100% of the time.
    5. WISH: No more than 1 second, 100% of the time.
  2.
## Database response time

    1. ID: PR2
    2. TAG: DatabaseResponseTime
    3. METER: Measurements obtained from the 1000 requests during testing.
    4. MUST: No more than 4 seconds, 99% of the time.
    5. PLAN: No more than 2 seconds, 99% of the time.
    6. WISH: No more than 1 second, 100% of the time.
  3.
## Location Fetch time

    1. ID: PR3
    2. TAG: LocationFetchTime
    3. METER: Measurements obtained from 1000 location retrievals during testing.
    4. MUST: No more than 5 seconds, 98% of the time.
    5. PLAN: No more than 3 seconds, 98% of the time.
    6. WISH: No more than 2 seconds, 100% of the time.

![](RackMultipart20210208-4-cy7mg7_html_fdca79ed2642d321.gif)

1.
## Design constraints

  1.
## Hard drive Space:

    1. ID: DC1
    2. TAG: HardDriveSpace
    3. GIST: Application&#39;s need for hard drive space.
    4. METER: Megabytes
    5. MUST: No more than 250 MB.
    6. PLAN: No more than 200 MB.
    7. WISH: No more than 150 MB.
  2.
## Application memory usage

    1. ID: DC2
    2. TAG: ApplicationMemoryUsage
    3. GIST: The amount of operating system memory required by the application.
    4. METER: Megabytes.
    5. MUST: No more than 300 MB.
    6. PLAN: No more than 250 MB.
    7. WISH: No more than 200 MB.

![](RackMultipart20210208-4-cy7mg7_html_fdca79ed2642d321.gif)

1.
## Non-Functional Attributes

  1.
## Availability -

    1. ID: NF1
    2. TAG: SystemAvailability
    3. GIST: Availability of the system when it is used; the application MUST be connected to the internet.
    4. METER: Measurements obtained from 100 hours of usage during testing.
    5. MUST: More than 98% of the time.
    6. PLAN: More than 99% of the time.
    7. WISH: 100% of the time.
  2.
## Maintainability -

    1. Title: SystemMaintainability
    2. DESC: The application should be easy to extend and test. The code should be easy to understand with proper documentation. Moreover, some testing environments should be set up to test different functions of the application.
    3. RAT: Implementations of future functions should be simple, and a testing environment is necessary to test the application.
  3.
## Portability -

    1. Title: SystemPortability
    2. DESC: The application should be portable with Android.
    3. RAT: Adaptable platform for the application to run on.
  4.
## Security -

    1. TAG: SystemSecurity
    2. GIST: The security of the system while logging in and making payments.
    3. METER: Measurements obtained from 100 hours of usage during testing.
    4. MUST: More than 95% of the time.
    5. PLAN: More than 98% of the time.
    6. WISH: 100% of the time.
  5.
## Reliability -

    1. TAG: SystemReliability
    2. GIST: The reliability of the system.
    3. METER: Measurements obtained from 100 hours of usage during testing.
    4. MUST: More than 90% of the time.
    5. PLAN: More than 94% of the time.
    6. WISH: More than 97% of the time.

![](RackMultipart20210208-4-cy7mg7_html_fdca79ed2642d321.gif)

1.
## Preliminary schedule &amp; budget

| **ID** | **Dependencies** | **Description** | **Release** | **Duration(Team hrs)** |
| --- | --- | --- | --- | --- |
| FR1 | EI1 | Authorization | 1 | 7 |
| FR2 |
 | Generic Layout | 1 | 3 |
| FR3 | FR1 | Home Page | 1 | 5 |
| FR4 | FR3 | Service-specific Page | 1 | 5 |
| FR5 |
 | Cart | 2 | 4 |
| FR6 | FR5 | Checkout Cart | 2 | 6 |
| FR7 | EI3 | Proceed with payment | 2 | 3 |
| FR8 |
 | Profile | 2 | 4 |
| FR9 |
 | Order | 3 | 3 |
| FR10 |
 | Subscription | 3 | 2 |
| EI1 |
 | Authentication | 1 | 2 |
| EI2 |
 | Locate user | 2 | 7 |
| EI3 |
 | Payment | 2 | 9 |
| PR1 |
 | UI response time | 4 | \* |
| PR2 |
 | Database response time | 4 | \* |
| PR3 |
 | Location fetch time | 4 | \* |
| DC1 |
 | Hard drive space | 4 | \* |
| DC2 |
 | Application memory usage | 4 | \* |
| NF1 |
 | Availability | 4 | \* |

**Budget:** Since the initial user base is estimated around 1000 users, no additional funds are required.

![](RackMultipart20210208-4-cy7mg7_html_fdca79ed2642d321.gif)

1.
## Acceptance Criteria

  1. Authorization
  2. Payment
  3. Locate Users
  4. Cart
  5. Profile Page
  6. Home Page

![](RackMultipart20210208-4-cy7mg7_html_fdca79ed2642d321.gif)

## Summary of Meetings with Users/Sponsors

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

15
