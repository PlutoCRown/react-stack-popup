const test = [
    { value: 'a' },
    { value: 'b' },
    { value: 'c' },
] as const

function transform<const A extends readonly { value: string }[]>(
    config: A
): {
    [P in A[number] as P['value']]: {
        value: Extract<A[number], { value: P['value'] }>['value']
    }
} {
    return {} as any
}

const maped = transform(test)


if (test[0].value == 'a') {
    console.log('✅')
} else {
    console.log('never')
}


if (maped.a.value == 'a') {
    console.log('please fix')
} else {
    console.log('never')
}
