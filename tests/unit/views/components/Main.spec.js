import { mount, shallowMount } from '@vue/test-utils'
import Main from '@/components/Main.vue'
describe("Main", () => {
    let wrapper;
    let buttons;
    let H2s

    beforeEach(() => {
        wrapper = shallowMount(Main)        
    })

    test("rendering", () => {
        expect(wrapper.exists()).toEqual(true)
    })

    test("all buttons exist", () => {
        let buttons = wrapper.findAll('button')

        expect(buttons.length).toEqual(5)
    })

    test("first button is Start", () => {
        buttons = wrapper.findAll('button')

        expect(buttons[0].text()).toEqual("Start")
    })

    test("second button is Restart", () => {
        buttons = wrapper.findAll('button')

        expect(buttons[1].text()).toEqual("Restart")
    })

    test("third button is Rearrange", () => {
        buttons = wrapper.findAll('button')

        expect(buttons[2].text()).toEqual("Rearrange")
    })

    test("fourth button is Reset", () => {
        buttons = wrapper.findAll('button')

        expect(buttons[3].text()).toEqual("Reset")
    })

    test("fifth button is Submit", () => {
        buttons = wrapper.findAll('button')

        expect(buttons[4].text()).toEqual("Submit")
    })

    test("all h2s exist", () => {
        let H2s = wrapper.findAll('h2')

        expect(H2s.length).toEqual(6)
    })

            // let vals = ["Time: 10000", "Highscore: 0", "Score: 0", "Lives: 10", "Rearrange: 10", "Level: 1"]


    test("first h2 is correct", () => {
        let H2s = wrapper.findAll('h2')

        expect(H2s[0].text()).toEqual("Time: 10000")        
    })

    test("second h2 is correct", () => {
        let H2s = wrapper.findAll('h2')

        expect(H2s[1].text()).toEqual("Highscore: 0")        
    })

    test("third h2 is correct", () => {
        let H2s = wrapper.findAll('h2')

        expect(H2s[2].text()).toEqual("Score: 0")        
    })

    test("fourth h2 is correct", () => {
        let H2s = wrapper.findAll('h2')

        expect(H2s[3].text()).toEqual("Lives: 10")        
    })

    test("fifth h2 is correct", () => {
        let H2s = wrapper.findAll('h2')

        expect(H2s[4].text()).toEqual("Rearrange: 10")        
    })

    test("sixth h2 is correct", () => {
        let H2s = wrapper.findAll('h2')

        expect(H2s[5].text()).toEqual("Level: 1")        
    })    
})

