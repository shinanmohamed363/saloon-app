backend api->
 http://localhost:3000/api/owner/register
 {
  "name": "mohamedmaniq",
  "totalRevenue": 0,
  "phone": "07702213425",
  "address": "kandy",
  "note": "smart Salon",
  "email": "mohamedmaniq@gmail.com",
  "password": "678678678@sS"
}


http://localhost:3000/api/auth/login
{
   "email": "mohamedmaniq@gmail.com",
  "password": "678678678@sS"
}

http://localhost:3000/api/owner/force-delete/owner-0b734134-0bca-4742-a221-11d591c4a260
{
  "name": "nass woe",
  "email": "johsde@awmple.com",
  "password": "Passws!8",
  "role": "taff",
  "workLocation": "NewYork",
  "salary": 50000,
  "phone": "1234567990",
  "availability": 100,
  "experience": 5,
  "specialization": "Hair Stylist",
  "hireDate": "2023-01-01",
  "performanceRating": 4.5
}

http://localhost:3000/api/salon/create
{
    "name": "smart branch3",
    "gallery": ["https://example.com/image1.jpg", "https://example.com/image2.jpg","https://example.com/image2.jpg"],
    "rating": 4.5,
    "totalRevenue": 10000,
    "servicesOffered": ["Haircut", "Massage", "Facial"],
    "address": "mawanella",
    "openingHours": [
        { "day": "Monday", "from": "05:00", "to": "18:00" },
        { "day": "Tuesday", "from": "11:00", "to": "18:00" },
        { "day": "Wednesday", "from": "09:00", "to": "18:00" },
        { "day": "Thursday", "from": "09:00", "to": "18:00" },
        { "day": "Friday", "from": "09:00", "to": "18:00" },
        { "day": "Saturday", "from": "10:00", "to": "16:00" }
    ],
    "location": "colombo",
    "photo": "https://example.com/salon-photo.jpg",
    "category": "Luxury",
    "isOpen": true
}

http://localhost:3000/api/salon/create
{
  "employeeID": "staff-df3e1c2b-8c35-4c04-a493-3a7898c7f2f0",
  "salonID": "salon-9611613a-2ea9-4f6c-84d7-147359f349ff",
  "rating": 4.5,
  "name": "John Doe",
  "notes": "Experienced in haircuts and styling",
  "activeStatus": true,
  "tips": ["Friendly service", "Great with kids"]
}


http://localhost:3000/api/barber/availability
{
    "averageMinutesPerCustomer": 30,
    "breaks": [
        { "start": "12:00", "end": "13:00", "type": "Lunch" }
    ],
    "locations": ["ktk","mawanella","colombo"],
    "durationInDays": 4,
    "holidays": [
        {
            "locations": ["ktk","colombo"],
            "date": "2024-11-21",
            "reason": "woking holiday"
        }
        
    ]
}
http://localhost:3000/api/schedule/createschedule
{
    "request": {
        "averageMinutesPerCustomer": 30,
        "breaks": [
            {
                "start": "12:00",
                "end": "13:00",
                "type": "Lunch"
            }
        ],
        "locations": [
            "ktk",
            "mawanella",
            "colombo"
        ],
        "durationInDays": 4,
        "holidays": [
            {
                "locations": [
                    "ktk",
                    "colombo"
                ],
                "date": "2024-11-21",
                "reason": "woking holiday"
            }
        ]
    },
    "response": [
        {
            "locations": [
                "ktk"
            ],
            "schedule": [
                {
                    "date": "2024-11-19",
                    "slots": [
                        {
                            "start": "09:00",
                            "end": "09:30",
                            "isBreak": false
                        },
                        {
                            "start": "09:30",
                            "end": "10:00",
                            "isBreak": false
                        },
                        {
                            "start": "10:00",
                            "end": "10:30",
                            "isBreak": false
                        },
                        {
                            "start": "10:30",
                            "end": "11:00",
                            "isBreak": false
                        },
                        {
                            "start": "11:00",
                            "end": "11:30",
                            "isBreak": false
                        },
                        {
                            "start": "11:30",
                            "end": "12:00",
                            "isBreak": false
                        },
                        {
                            "start": "12:00",
                            "end": "13:00",
                            "type": "Lunch",
                            "isBreak": true
                        },
                        {
                            "start": "13:00",
                            "end": "13:30",
                            "isBreak": false
                        },
                        {
                            "start": "13:30",
                            "end": "14:00",
                            "isBreak": false
                        },
                        {
                            "start": "14:00",
                            "end": "14:30",
                            "isBreak": false
                        },
                        {
                            "start": "14:30",
                            "end": "15:00",
                            "isBreak": false
                        },
                        {
                            "start": "15:00",
                            "end": "15:30",
                            "isBreak": false
                        },
                        {
                            "start": "15:30",
                            "end": "16:00",
                            "isBreak": false
                        },
                        {
                            "start": "16:00",
                            "end": "16:30",
                            "isBreak": false
                        },
                        {
                            "start": "16:30",
                            "end": "17:00",
                            "isBreak": false
                        },
                        {
                            "start": "17:00",
                            "end": "17:30",
                            "isBreak": false
                        },
                        {
                            "start": "17:30",
                            "end": "18:00",
                            "isBreak": false
                        }
                    ]
                },
                {
                    "date": "2024-11-20",
                    "slots": [
                        {
                            "start": "09:00",
                            "end": "09:30",
                            "isBreak": false
                        },
                        {
                            "start": "09:30",
                            "end": "10:00",
                            "isBreak": false
                        },
                        {
                            "start": "10:00",
                            "end": "10:30",
                            "isBreak": false
                        },
                        {
                            "start": "10:30",
                            "end": "11:00",
                            "isBreak": false
                        },
                        {
                            "start": "11:00",
                            "end": "11:30",
                            "isBreak": false
                        },
                        {
                            "start": "11:30",
                            "end": "12:00",
                            "isBreak": false
                        },
                        {
                            "start": "12:00",
                            "end": "13:00",
                            "type": "Lunch",
                            "isBreak": true
                        },
                        {
                            "start": "13:00",
                            "end": "13:30",
                            "isBreak": false
                        },
                        {
                            "start": "13:30",
                            "end": "14:00",
                            "isBreak": false
                        },
                        {
                            "start": "14:00",
                            "end": "14:30",
                            "isBreak": false
                        },
                        {
                            "start": "14:30",
                            "end": "15:00",
                            "isBreak": false
                        },
                        {
                            "start": "15:00",
                            "end": "15:30",
                            "isBreak": false
                        },
                        {
                            "start": "15:30",
                            "end": "16:00",
                            "isBreak": false
                        },
                        {
                            "start": "16:00",
                            "end": "16:30",
                            "isBreak": false
                        },
                        {
                            "start": "16:30",
                            "end": "17:00",
                            "isBreak": false
                        },
                        {
                            "start": "17:00",
                            "end": "17:30",
                            "isBreak": false
                        },
                        {
                            "start": "17:30",
                            "end": "18:00",
                            "isBreak": false
                        }
                    ]
                },
                {
                    "date": "2024-11-21",
                    "holiday": {
                        "reason": "woking holiday"
                    }
                },
                {
                    "date": "2024-11-22",
                    "slots": [
                        {
                            "start": "09:00",
                            "end": "09:30",
                            "isBreak": false
                        },
                        {
                            "start": "09:30",
                            "end": "10:00",
                            "isBreak": false
                        },
                        {
                            "start": "10:00",
                            "end": "10:30",
                            "isBreak": false
                        },
                        {
                            "start": "10:30",
                            "end": "11:00",
                            "isBreak": false
                        },
                        {
                            "start": "11:00",
                            "end": "11:30",
                            "isBreak": false
                        },
                        {
                            "start": "11:30",
                            "end": "12:00",
                            "isBreak": false
                        },
                        {
                            "start": "12:00",
                            "end": "13:00",
                            "type": "Lunch",
                            "isBreak": true
                        },
                        {
                            "start": "13:00",
                            "end": "13:30",
                            "isBreak": false
                        },
                        {
                            "start": "13:30",
                            "end": "14:00",
                            "isBreak": false
                        },
                        {
                            "start": "14:00",
                            "end": "14:30",
                            "isBreak": false
                        },
                        {
                            "start": "14:30",
                            "end": "15:00",
                            "isBreak": false
                        },
                        {
                            "start": "15:00",
                            "end": "15:30",
                            "isBreak": false
                        },
                        {
                            "start": "15:30",
                            "end": "16:00",
                            "isBreak": false
                        },
                        {
                            "start": "16:00",
                            "end": "16:30",
                            "isBreak": false
                        },
                        {
                            "start": "16:30",
                            "end": "17:00",
                            "isBreak": false
                        },
                        {
                            "start": "17:00",
                            "end": "17:30",
                            "isBreak": false
                        },
                        {
                            "start": "17:30",
                            "end": "18:00",
                            "isBreak": false
                        }
                    ]
                }
            ]
        },
        {
            "locations": [
                "mawanella"
            ],
            "schedule": [
                {
                    "date": "2024-11-19",
                    "slots": [
                        {
                            "start": "11:00",
                            "end": "11:30",
                            "isBreak": false
                        },
                        {
                            "start": "11:30",
                            "end": "12:00",
                            "isBreak": false
                        },
                        {
                            "start": "12:00",
                            "end": "13:00",
                            "type": "Lunch",
                            "isBreak": true
                        },
                        {
                            "start": "13:00",
                            "end": "13:30",
                            "isBreak": false
                        },
                        {
                            "start": "13:30",
                            "end": "14:00",
                            "isBreak": false
                        },
                        {
                            "start": "14:00",
                            "end": "14:30",
                            "isBreak": false
                        },
                        {
                            "start": "14:30",
                            "end": "15:00",
                            "isBreak": false
                        },
                        {
                            "start": "15:00",
                            "end": "15:30",
                            "isBreak": false
                        },
                        {
                            "start": "15:30",
                            "end": "16:00",
                            "isBreak": false
                        },
                        {
                            "start": "16:00",
                            "end": "16:30",
                            "isBreak": false
                        },
                        {
                            "start": "16:30",
                            "end": "17:00",
                            "isBreak": false
                        },
                        {
                            "start": "17:00",
                            "end": "17:30",
                            "isBreak": false
                        },
                        {
                            "start": "17:30",
                            "end": "18:00",
                            "isBreak": false
                        }
                    ]
                },
                {
                    "date": "2024-11-20",
                    "slots": [
                        {
                            "start": "09:00",
                            "end": "09:30",
                            "isBreak": false
                        },
                        {
                            "start": "09:30",
                            "end": "10:00",
                            "isBreak": false
                        },
                        {
                            "start": "10:00",
                            "end": "10:30",
                            "isBreak": false
                        },
                        {
                            "start": "10:30",
                            "end": "11:00",
                            "isBreak": false
                        },
                        {
                            "start": "11:00",
                            "end": "11:30",
                            "isBreak": false
                        },
                        {
                            "start": "11:30",
                            "end": "12:00",
                            "isBreak": false
                        },
                        {
                            "start": "12:00",
                            "end": "13:00",
                            "type": "Lunch",
                            "isBreak": true
                        },
                        {
                            "start": "13:00",
                            "end": "13:30",
                            "isBreak": false
                        },
                        {
                            "start": "13:30",
                            "end": "14:00",
                            "isBreak": false
                        },
                        {
                            "start": "14:00",
                            "end": "14:30",
                            "isBreak": false
                        },
                        {
                            "start": "14:30",
                            "end": "15:00",
                            "isBreak": false
                        },
                        {
                            "start": "15:00",
                            "end": "15:30",
                            "isBreak": false
                        },
                        {
                            "start": "15:30",
                            "end": "16:00",
                            "isBreak": false
                        },
                        {
                            "start": "16:00",
                            "end": "16:30",
                            "isBreak": false
                        },
                        {
                            "start": "16:30",
                            "end": "17:00",
                            "isBreak": false
                        },
                        {
                            "start": "17:00",
                            "end": "17:30",
                            "isBreak": false
                        },
                        {
                            "start": "17:30",
                            "end": "18:00",
                            "isBreak": false
                        }
                    ]
                },
                {
                    "date": "2024-11-21",
                    "slots": [
                        {
                            "start": "09:00",
                            "end": "09:30",
                            "isBreak": false
                        },
                        {
                            "start": "09:30",
                            "end": "10:00",
                            "isBreak": false
                        },
                        {
                            "start": "10:00",
                            "end": "10:30",
                            "isBreak": false
                        },
                        {
                            "start": "10:30",
                            "end": "11:00",
                            "isBreak": false
                        },
                        {
                            "start": "11:00",
                            "end": "11:30",
                            "isBreak": false
                        },
                        {
                            "start": "11:30",
                            "end": "12:00",
                            "isBreak": false
                        },
                        {
                            "start": "12:00",
                            "end": "13:00",
                            "type": "Lunch",
                            "isBreak": true
                        },
                        {
                            "start": "13:00",
                            "end": "13:30",
                            "isBreak": false
                        },
                        {
                            "start": "13:30",
                            "end": "14:00",
                            "isBreak": false
                        },
                        {
                            "start": "14:00",
                            "end": "14:30",
                            "isBreak": false
                        },
                        {
                            "start": "14:30",
                            "end": "15:00",
                            "isBreak": false
                        },
                        {
                            "start": "15:00",
                            "end": "15:30",
                            "isBreak": false
                        },
                        {
                            "start": "15:30",
                            "end": "16:00",
                            "isBreak": false
                        },
                        {
                            "start": "16:00",
                            "end": "16:30",
                            "isBreak": false
                        },
                        {
                            "start": "16:30",
                            "end": "17:00",
                            "isBreak": false
                        },
                        {
                            "start": "17:00",
                            "end": "17:30",
                            "isBreak": false
                        },
                        {
                            "start": "17:30",
                            "end": "18:00",
                            "isBreak": false
                        }
                    ]
                },
                {
                    "date": "2024-11-22",
                    "slots": [
                        {
                            "start": "09:00",
                            "end": "09:30",
                            "isBreak": false
                        },
                        {
                            "start": "09:30",
                            "end": "10:00",
                            "isBreak": false
                        },
                        {
                            "start": "10:00",
                            "end": "10:30",
                            "isBreak": false
                        },
                        {
                            "start": "10:30",
                            "end": "11:00",
                            "isBreak": false
                        },
                        {
                            "start": "11:00",
                            "end": "11:30",
                            "isBreak": false
                        },
                        {
                            "start": "11:30",
                            "end": "12:00",
                            "isBreak": false
                        },
                        {
                            "start": "12:00",
                            "end": "13:00",
                            "type": "Lunch",
                            "isBreak": true
                        },
                        {
                            "start": "13:00",
                            "end": "13:30",
                            "isBreak": false
                        },
                        {
                            "start": "13:30",
                            "end": "14:00",
                            "isBreak": false
                        },
                        {
                            "start": "14:00",
                            "end": "14:30",
                            "isBreak": false
                        },
                        {
                            "start": "14:30",
                            "end": "15:00",
                            "isBreak": false
                        },
                        {
                            "start": "15:00",
                            "end": "15:30",
                            "isBreak": false
                        },
                        {
                            "start": "15:30",
                            "end": "16:00",
                            "isBreak": false
                        },
                        {
                            "start": "16:00",
                            "end": "16:30",
                            "isBreak": false
                        },
                        {
                            "start": "16:30",
                            "end": "17:00",
                            "isBreak": false
                        },
                        {
                            "start": "17:00",
                            "end": "17:30",
                            "isBreak": false
                        },
                        {
                            "start": "17:30",
                            "end": "18:00",
                            "isBreak": false
                        }
                    ]
                }
            ]
        },
        {
            "locations": [
                "colombo"
            ],
            "schedule": [
                {
                    "date": "2024-11-19",
                    "slots": [
                        {
                            "start": "05:00",
                            "end": "05:30",
                            "isBreak": false
                        },
                        {
                            "start": "05:30",
                            "end": "06:00",
                            "isBreak": false
                        },
                        {
                            "start": "06:00",
                            "end": "06:30",
                            "isBreak": false
                        },
                        {
                            "start": "06:30",
                            "end": "07:00",
                            "isBreak": false
                        },
                        {
                            "start": "07:00",
                            "end": "07:30",
                            "isBreak": false
                        },
                        {
                            "start": "07:30",
                            "end": "08:00",
                            "isBreak": false
                        },
                        {
                            "start": "08:00",
                            "end": "08:30",
                            "isBreak": false
                        },
                        {
                            "start": "08:30",
                            "end": "09:00",
                            "isBreak": false
                        },
                        {
                            "start": "09:00",
                            "end": "09:30",
                            "isBreak": false
                        },
                        {
                            "start": "09:30",
                            "end": "10:00",
                            "isBreak": false
                        },
                        {
                            "start": "10:00",
                            "end": "10:30",
                            "isBreak": false
                        },
                        {
                            "start": "10:30",
                            "end": "11:00",
                            "isBreak": false
                        },
                        {
                            "start": "11:00",
                            "end": "11:30",
                            "isBreak": false
                        },
                        {
                            "start": "11:30",
                            "end": "12:00",
                            "isBreak": false
                        },
                        {
                            "start": "12:00",
                            "end": "13:00",
                            "type": "Lunch",
                            "isBreak": true
                        },
                        {
                            "start": "13:00",
                            "end": "13:30",
                            "isBreak": false
                        },
                        {
                            "start": "13:30",
                            "end": "14:00",
                            "isBreak": false
                        },
                        {
                            "start": "14:00",
                            "end": "14:30",
                            "isBreak": false
                        },
                        {
                            "start": "14:30",
                            "end": "15:00",
                            "isBreak": false
                        },
                        {
                            "start": "15:00",
                            "end": "15:30",
                            "isBreak": false
                        },
                        {
                            "start": "15:30",
                            "end": "16:00",
                            "isBreak": false
                        },
                        {
                            "start": "16:00",
                            "end": "16:30",
                            "isBreak": false
                        },
                        {
                            "start": "16:30",
                            "end": "17:00",
                            "isBreak": false
                        },
                        {
                            "start": "17:00",
                            "end": "17:30",
                            "isBreak": false
                        },
                        {
                            "start": "17:30",
                            "end": "18:00",
                            "isBreak": false
                        }
                    ]
                },
                {
                    "date": "2024-11-20",
                    "slots": [
                        {
                            "start": "09:00",
                            "end": "09:30",
                            "isBreak": false
                        },
                        {
                            "start": "09:30",
                            "end": "10:00",
                            "isBreak": false
                        },
                        {
                            "start": "10:00",
                            "end": "10:30",
                            "isBreak": false
                        },
                        {
                            "start": "10:30",
                            "end": "11:00",
                            "isBreak": false
                        },
                        {
                            "start": "11:00",
                            "end": "11:30",
                            "isBreak": false
                        },
                        {
                            "start": "11:30",
                            "end": "12:00",
                            "isBreak": false
                        },
                        {
                            "start": "12:00",
                            "end": "13:00",
                            "type": "Lunch",
                            "isBreak": true
                        },
                        {
                            "start": "13:00",
                            "end": "13:30",
                            "isBreak": false
                        },
                        {
                            "start": "13:30",
                            "end": "14:00",
                            "isBreak": false
                        },
                        {
                            "start": "14:00",
                            "end": "14:30",
                            "isBreak": false
                        },
                        {
                            "start": "14:30",
                            "end": "15:00",
                            "isBreak": false
                        },
                        {
                            "start": "15:00",
                            "end": "15:30",
                            "isBreak": false
                        },
                        {
                            "start": "15:30",
                            "end": "16:00",
                            "isBreak": false
                        },
                        {
                            "start": "16:00",
                            "end": "16:30",
                            "isBreak": false
                        },
                        {
                            "start": "16:30",
                            "end": "17:00",
                            "isBreak": false
                        },
                        {
                            "start": "17:00",
                            "end": "17:30",
                            "isBreak": false
                        },
                        {
                            "start": "17:30",
                            "end": "18:00",
                            "isBreak": false
                        }
                    ]
                },
                {
                    "date": "2024-11-21",
                    "holiday": {
                        "reason": "woking holiday"
                    }
                },
                {
                    "date": "2024-11-22",
                    "slots": [
                        {
                            "start": "09:00",
                            "end": "09:30",
                            "isBreak": false
                        },
                        {
                            "start": "09:30",
                            "end": "10:00",
                            "isBreak": false
                        },
                        {
                            "start": "10:00",
                            "end": "10:30",
                            "isBreak": false
                        },
                        {
                            "start": "10:30",
                            "end": "11:00",
                            "isBreak": false
                        },
                        {
                            "start": "11:00",
                            "end": "11:30",
                            "isBreak": false
                        },
                        {
                            "start": "11:30",
                            "end": "12:00",
                            "isBreak": false
                        },
                        {
                            "start": "12:00",
                            "end": "13:00",
                            "type": "Lunch",
                            "isBreak": true
                        },
                        {
                            "start": "13:00",
                            "end": "13:30",
                            "isBreak": false
                        },
                        {
                            "start": "13:30",
                            "end": "14:00",
                            "isBreak": false
                        },
                        {
                            "start": "14:00",
                            "end": "14:30",
                            "isBreak": false
                        },
                        {
                            "start": "14:30",
                            "end": "15:00",
                            "isBreak": false
                        },
                        {
                            "start": "15:00",
                            "end": "15:30",
                            "isBreak": false
                        },
                        {
                            "start": "15:30",
                            "end": "16:00",
                            "isBreak": false
                        },
                        {
                            "start": "16:00",
                            "end": "16:30",
                            "isBreak": false
                        },
                        {
                            "start": "16:30",
                            "end": "17:00",
                            "isBreak": false
                        },
                        {
                            "start": "17:00",
                            "end": "17:30",
                            "isBreak": false
                        },
                        {
                            "start": "17:30",
                            "end": "18:00",
                            "isBreak": false
                        }
                    ]
                }
            ]
        }
    ]
}

http://localhost:3000/api/barber/assign-availability

http://localhost:3000/api/staff/register
{
  "name": "staff three",
  "email": "staffthree@gmail.com",
  "password": "Password123!",
  "role": "Manager",
  "workLocation": "mawanella",
  "salary": 50000,
  "phone": "1234567890",
  "availability": 80,
  "experience": 5,
  "specialization": "Hair Stylist",
  "hireDate": "2023-10-01",
  "performanceRating": 4.5
}

http://localhost:3000/api/barber/create
 {"employeeID": "staff-688cd3d1-2f80-4d1d-be54-83394137c3c7",
  "salonID": "salon-092aa13a-0f40-47b9-93c4-7c25719d11ef",
  "rating": 4.5,
  "name": "staff three",
  "notes": "Specializes in fades and Haircut and Massage.",
  "activeStatus": true,
  "tips": [
    "Haircut",
    "Massage"
  ]

 }


 