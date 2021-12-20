const math = require("./math") ;

test("gets 8", ()=> {
    expect(math.add(4,4)).toBe(8)
})

test("gets 4", ()=> {
    expect(math.add(2,2)).toBe(4)
})

test("not get 16", ()=> {
    expect(math.add(4,4)).not.toBe(16)
})

test("is Null", ()=> {
    expect(math.isNull()).toBeNull()
})

test("is falsy", ()=> {
    expect(math.value(0)).toBeFalsy()
})

test("created User", ()=> {
    expect(math.createUser("Levi", "Appenfelder", 7)).toEqual({id: 8, firstName: "Levi", lastName: "Appenfelder"})
})

test("greater than -1", ()=> {
    expect(math.greaterThanNegativeOne(1)).toBeGreaterThan(-1)
})

test("too small", ()=> {
    expect(math.greaterThanNegativeOne(0)).not.toBeLessThan(-1)
})

test("email matcher", () => {
    expect(math.email("levij.app@gmail.com")).toMatch(/[a-zA-Z]+[.]com/)
})

test("fetch working", () => {
    return math.fetchWorking()
    .then(data => {
        expect(data.results[0].id).toBe(3)
    })

    expect.assertions(1);

})

test("initial api message", async () => {

    const mess = await math.emptyFetch()
    
    expect(mess.message).toBe("Excess Material api is working")
    expect.assertions(1);

})

test("defined", () => {

    expect(math.power()).toBeDefined()

})

test("alternating", () => {

    expect(math.alternate("Hello")).toEqual("HeLlO")

})

test("increasing length arrays", () => {

    expect(math.numArray(4)).toEqual([[1], [2, 3], [4, 5, 6], [7, 8, 9, 10]])

})