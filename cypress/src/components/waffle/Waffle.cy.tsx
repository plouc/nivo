import { Waffle } from '@bitbloom/nivo-waffle'

describe('<Waffle />', () => {
    it('should show a tooltip when hovering the areas', () => {
        cy.mount(
            <Waffle
                width={500}
                height={300}
                total={100}
                data={[
                    {
                        id: 'cats',
                        label: 'Cats',
                        value: 43,
                    },
                    {
                        id: 'dogs',
                        label: 'Dogs',
                        value: 27,
                    },
                    {
                        id: 'rabbits',
                        label: 'Rabits',
                        value: 17,
                    },
                ]}
                columns={12}
                rows={20}
                animate={false}
                testIdPrefix="waffle"
            />
        )

        const pets = ['cats', 'dogs', 'rabbits']
        pets.forEach(pet => {
            const area = cy.get(`[data-test-id="waffle.area_${pet}.polygon_0"]`)
            area.should('exist')

            area.trigger('mouseover')
            cy.get('svg + div').should('exist')

            area.trigger('mouseout')
            cy.get('svg + div').should('not.exist')
        })
    })
})
