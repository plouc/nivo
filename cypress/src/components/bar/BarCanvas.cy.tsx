import { BarCanvas } from '@nivo/bar'

describe('<BarCanvas />', () => {
    it('should render a bar chart', () => {
        cy.mount(
            <BarCanvas
                width={500}
                height={300}
                data={[
                    { id: 'one', value: 10 },
                    { id: 'two', value: 20 },
                    { id: 'three', value: 30 },
                ]}
            />
        )
    })
})
