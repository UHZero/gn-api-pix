const date = new Date('2022-11-13T04:49:24.945Z').toString()
const parseDate = Date.parse(date)
const formatedDate = new Intl.DateTimeFormat('pt-BR', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'America/Sao_paulo'
}).format(parseDate)
console.log(formatedDate)