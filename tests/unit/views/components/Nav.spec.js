import { mount, shallowMount } from '@vue/test-utils'
import Nav from '@/components/Nav.vue'
import AnagramScramLogo from "@/assets/anagramscramlogomain.png"
describe("Nav", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Nav)
    })

    test("rendering", () => {
        expect(wrapper.exists()).toEqual(true)
    })

    test("category is ANIMALS", () => {
        expect(wrapper.find("a").text()).toEqual("ANIMALS")
    })

    test("game name is AnagramScram", () => {
        expect(wrapper.find("h1").text()).toEqual("AnagramScram")
    })

    test("class is set for nav component", () => {
        expect(wrapper.attributes("class")).toEqual("nav")
    })

    test("logo image exists", () => {
        let img = wrapper.find("img")
        expect(img.exists()).toEqual(true)
    })
    
    test("alt on logo is set correctly", () => {
        expect(wrapper.find("img").attributes("alt")).toEqual("AnagramScram logo")
    })
})

