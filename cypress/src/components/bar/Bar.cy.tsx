import { Bar } from '@nivo/bar'

describe('<Bar />', () => {
    it('should render a bar chart', () => {
        cy.mount(
            <Bar
                width={500}
                height={300}
                data={[
                    { id: 'one', value: 10 },
                    { id: 'two', value: 20 },
                    { id: 'three', value: 30 },
                ]}
                animate={false}
            />
        )
    })
})
