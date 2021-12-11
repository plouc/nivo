import { randomChoice } from './random'
import { range } from 'lodash'

export const demographicsRanges = {
    age: {
        id: 'Age',
        keys: ['<10', '10-18', '18-24', '24-34', '35-44', '45-54', '55-64', '>65'],
    },
    yearsOfExperience: {
        id: 'Years of Experience',
        keys: ['<1 years', '1-2 years', '2-5 years', '5-10 years', '10-20 years', '>20 years'],
    },
    companySize: {
        id: 'Company Size',
        keys: ['1', '1-5', '5-10', '10-20', '20-50', '50-100', '100-1000', '>1000'],
    },
    higherEducationDegree: {
        id: 'Higher Education Degree',
        keys: ['No', 'Yes, related field', 'Yes, unrelated field'],
    },
    yearlySalary: {
        id: 'Yearly Salary',
        keys: ['$0', '$0-$10k', '$10k-$30k', '$30k-$50k', '$50k-$100k', '$100k-$200k', '>$200k'],
    },
    gender: {
        id: 'Gender',
        keys: ['Man', 'Woman', 'Non-Binary or GNC', 'Not Listed'],
    },
    raceAndEthnicity: {
        id: 'Race & Ethnicity',
        keys: [
            'White',
            'Hispanic or Latino/Latina/Latinx',
            'East Asian',
            'Multiracial',
            'South East Asian',
            'Middle Eastern',
            'South Asian',
            'Not Listed',
            'Black or of African descent',
            'Native American, Pacific Islander, or Indigenous Australian',
        ],
    },
    disabilityStatus: {
        id: 'Disability Status',
        keys: [
            'Not Listed',
            'Cognitive impairments',
            'Visual impairments',
            'Hearing impairments',
            'Mobility impairments',
        ],
    },
}

export const randomDemographicRange = (excludeIds: string[] = []) => {
    const candidates = Object.values(demographicsRanges).filter(
        range => !excludeIds.includes(range.id)
    )

    return randomChoice(candidates)
}

export const randomDemographicMatrix = () => {
    const xRange = randomDemographicRange()
    const yRange = randomDemographicRange([xRange.id])

    const data = yRange.keys.map(() =>
        xRange.keys.map(() => Math.round(1000 + Math.random() * 10000))
    )

    return {
        xRange,
        yRange,
        data,
    }
}
