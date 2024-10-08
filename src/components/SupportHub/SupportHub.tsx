'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SupportService {
    Name: string
    What: string
    Who: string
    Phone: string
    Email: string
    address: string
    Category: string
}

const supportServices: SupportService[] = [
    {
        "Name": "Aboriginal Family Violence Prevention and Legal Service Victoria",
        "What": "Legal Services, Counselling Support, Information, Referral and Support, Community Education and Training",
        "Who": "NULL",
        "Phone": "9244 3333",
        "Email": "NULL",
        "address": "Level 3 70-80 Wellington Street Collingwood",
        "Category": "Legal / Financial Advice"
    },
    {
        "Name": "Flemington & Kensington Community Legal Centre",
        "What": "free legal advice and assistance for residents of Flemington and Kensington",
        "Who": "residents of Flemington and Kensington",
        "Phone": "9376 4355",
        "Email": "fklegal@fkclc.org.au",
        "address": " 22 Bellair Street Kensington",
        "Category": "Legal / Financial Advice"
    },
    {
        "Name": "Alcoholics Anonymous Victoria",
        "What": "AA is a fellowship of men and women who share their experience, strength and hope with each other that they may solve their common problem and help others to recover from alcoholism. Two gay and lesbian groups and two Koori groups are held weekly.  24 hour Help Line",
        "Who": "NULL",
        "Phone": "9429 1833",
        "Email": "NULL",
        "address": "Level 1 36 Church Street Richmond",
        "Category": "OTHER"
    },
    {
        "Name": "Anglicare Victoria – St.Mark's Community Centre",
        "What": "St Mark's provides assistance to homeless people.  Drop-in centre Monday to Friday.\nBread, fruit, vegetables, weekly food parcels are available.\nLunch, Tea and Coffee facilities, Showers, Washing machines and dryers, Toiletries, Public telephones, Advice and referral.\nSt Mark's will provide up to five PBS prescriptions per month for homeless people through the co-payment prescription scheme.  (Not Methadone / Buprenorphine).",
        "Who": "NULL",
        "Phone": "9419 3288",
        "Email": "NULL",
        "address": " 250 George Street Fitzroy",
        "Category": "OTHER"
    },
    {
        "Name": "Royal Melbourne Hospital",
        "What": "Outpatients' emergency service",
        "Who": "NULL",
        "Phone": "9342 7000",
        "Email": "enquiries@mh.org.au",
        "address": " 300 Grattan Street Parkville",
        "Category": "Hospitals / Emergency"
    },
    {
        "Name": "CASA House Centre Against Sexual Assault",
        "What": "counselling, advocacy, health services, legal advice\n\nThe crisis-care unit at the Royal Women's Hospital is available for recent assault victims.",
        "Who": "NULL",
        "Phone": "9635 3600",
        "Email": "casa@thewomens.org.au",
        "address": "3rd Floor Queen Victoria Women's Centre 210 Lonsdale Street Melbourne",
        "Category": "Hospitals / Emergency"
    },
    {
        "Name": "COHEALTH",
        "What": "Outreach Support Services for people experiencing or at risk of becoming homelessness., Homeless Mental Health and Housing Service,\nAllied Health Outreach Services, Dietetics and Café Meals, Podiatry, Occupational Therapy, Physiotherapy",
        "Who": "NULL",
        "Phone": "1300 022 247",
        "Email": "NULL",
        "address": " 53 Victoria Street Melbourne",
        "Category": "Counselling and Psychiatric Services"
    },
    {
        "Name": "Women's Health West",
        "What": "Women's Health West is committed to improving equity and justice for women in Melbourne's diverse western region.  We incorporate a health promotion, research and development team with a family violence service for women and children providing:\n\ninformation, referral , counselling , crisis support , court support , support groups",
        "Who": "NULL",
        "Phone": "9689 9588",
        "Email": "info@whwest.org.au",
        "address": " 317-319 Barkly Street Footscray",
        "Category": "Counselling and Psychiatric Services"
    },
    {
        "Name": "COHEALTH",
        "What": "Provides a broad range of health and welfare services \nDrop-in Clinic for homeless people every Monday from 9am -12 noon. Services include physiotherapy, podiatry, occupational therapy, dietetics, and nursing.\n\nAboriginal engagement worker available, café meals program for homeless people, drop-in social work/counselling sessions, showers, needle and syringe program\n\ndental services for homeless people and for people with drug and/or alcohol issues – phone dental reception:  9411 3505",
        "Who": "NULL",
        "Phone": "9411 3555",
        "Email": "NULL",
        "address": " 75 Brunswick Street Fitzroy",
        "Category": "Health Services / Pharmacy"
    },
    {
        "Name": "Living Room Primary Health Service",
        "What": "Living Room is made up of a team of doctors/nurses and community development workers who provide a confidential 'user friendly' free health service.\n\nhealth services, referrals and information, chill out space, tea and coffee\n\n\nThere are a number of co-located services including:\nCentrelink, podiatry, dieticians, dental hygienist, mental health nurses, social worker, psychologist, Hep C, liver clinic, housing services, youth response, employment agency.\n\nDrop into Hosier Lane or contact outreach workers by phone.",
        "Who": "NULL",
        "Phone": "9945 2100",
        "Email": "livingroom@youthprojects.org.au",
        "address": " 7-9 Hosier Lane Melbourne",
        "Category": "Health Services / Pharmacy"
    }
]

export default function Component() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const categories = Array.from(new Set(supportServices.map(service => service.Category)))
        .sort((a, b) => {
            if (a === "OTHER") return 1
            if (b === "OTHER") return -1
            return a.localeCompare(b)
        })

    const toggleCategory = (category: string) => {
        setSelectedCategory(selectedCategory === category ? null : category)
    }

    const renderServiceInfo = (service: SupportService) => (
        <Card key={service.Name} className="mb-4">
            <CardHeader>
                <CardTitle>{service.Name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p><strong>What:</strong> {service.What}</p>
                <p><strong>Phone:</strong> {service.Phone}</p>
                {service.Email !== "NULL" && <p><strong>Email:</strong> {service.Email}</p>}
                <p><strong>Address:</strong> {service.address}</p>
            </CardContent>
        </Card>
    )

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-2 text-center">Support Hub</h1>
            <p className="text-center mb-6 text-gray-600">Support Resources When You Need It</p>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Need Assistance? Choose below:</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={`w-full bg-[#9DCBF0] hover:bg-[#7DBAE0] text-black ${
                                selectedCategory === category ? 'ring-2 ring-black' : ''
                            }`}
                        >
                            {category}
                        </Button>
                    ))}
                </CardContent>
            </Card>
            {selectedCategory && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">{selectedCategory}</h2>
                    {supportServices
                        .filter(service => service.Category === selectedCategory)
                        .map(renderServiceInfo)}
                </div>
            )}
        </div>
    )
}