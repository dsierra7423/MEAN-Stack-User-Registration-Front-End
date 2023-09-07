export interface PendingPayments {
    dateOfIssue: string;
    iD: string;
    type: string;
    dueDate: string;
    state: string;
    foreignExchange: string;
    invoiceAmount: number;
    balanceDue: number;
    billingPeriod: string;
    data: InvoiceDetail[];
}

export interface Transactions {
    transactionDate: string;
    invoiceID: string;
    paymentMethod: string;
    type: string;
    foreignExchange: string;
    amount: number;
    billingPeriod: string;
    data: InvoiceDetail[];
}

export interface InvoiceDetail {
    id: string;
    item: string;
    quantity: number;	
    priceUnit: number;
    amount: number;
}

const invoiceDetail01:InvoiceDetail[] = [
    {
        id: '01',
        item: 'Diccionario',
        quantity: 1,
        priceUnit: 100,
        amount: 100,
    },
    {
        id: '02',
        item: 'Tinta china',
        quantity: 1,
        priceUnit: 200,
        amount: 200,
    },
    {
        id: '03',
        item: 'Libretas de apuntes',
        quantity: 5,
        priceUnit: 100,
        amount: 500,
    },
    {
        id: '04',
        item: 'Pinceles',
        quantity: 1,
        priceUnit: 100,
        amount: 100,
    },

]

const invoiceDetail02: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Audífonos',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
    {
        id: '02',
        item: 'Cámara Web',
        quantity: 1,
        priceUnit: 1500,
        amount: 1500,
    },
]

const invoiceDetail03: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Impresora',
        quantity: 1,
        priceUnit: 2500,
        amount: 2500,
    },
]

const invoiceDetail04: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Impresora',
        quantity: 1,
        priceUnit: 2500,
        amount: 2500,
    },
]

const invoiceDetail05: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Impresora',
        quantity: 1,
        priceUnit: 2500,
        amount: 2500,
    },
]

const invoiceDetail06: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Impresora',
        quantity: 1,
        priceUnit: 2500,
        amount: 2500,
    },
]

const invoiceDetail07: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Impresora',
        quantity: 1,
        priceUnit: 2500,
        amount: 2500,
    },
]

const invoiceDetail08: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Impresora',
        quantity: 1,
        priceUnit: 2500,
        amount: 2500,
    },
]

const invoiceDetail09: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Impresora',
        quantity: 1,
        priceUnit: 2500,
        amount: 2500,
    },
]

const invoiceDetail10: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Impresora',
        quantity: 1,
        priceUnit: 2500,
        amount: 2500,
    },
]

const invoiceDetail11: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Tarjeta de Red',
        quantity: 1,
        priceUnit: 1000,
        amount: 1000,
    },
    {
        id: '02',
        item: 'Modem',
        quantity: 1,
        priceUnit: 1000,
        amount: 1000,
    },
    {
        id: '03',
        item: 'Teclado',
        quantity: 1,
        priceUnit: 1000,
        amount: 1000,
    },
    {
        id: '04',
        item: 'Escáner',
        quantity: 1,
        priceUnit: 1000,
        amount: 1000,
    },
    {
        id: '05',
        item: 'Memoria Portátil',
        quantity: 5,
        priceUnit: 100,
        amount: 500,
    },
    {
        id: '06',
        item: 'Sacapuntas',
        quantity: 5,
        priceUnit: 10,
        amount: 50,
    },
    {
        id: '07',
        item: 'Libreta de apuntes',
        quantity: 2,
        priceUnit: 100,
        amount: 200,
    },
    {
        id: '08',
        item: 'Audífonos',
        quantity: 1,
        priceUnit: 250,
        amount: 250,
    },
]

const invoiceDetail12: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Blusa manga larga Mujer',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
    {
        id: '02',
        item: 'Blusa manga larga Mujer',
        quantity: 1,
        priceUnit: 1000,
        amount: 1000,
    },
    {
        id: '03',
        item: 'Jeans Straight Mujer',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
]

const invoiceDetail13: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Playera cuello redondo manga corta',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
    {
        id: '02',
        item: 'Short con rayas Mujer',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
]

const invoiceDetail14: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Playera cuello redondo manga corta',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
    {
        id: '02',
        item: 'Short con rayas Mujer',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
]

const invoiceDetail15: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Playera cuello redondo manga corta',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
    {
        id: '02',
        item: 'Short con rayas Mujer',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
]

const invoiceDetail16: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Playera cuello redondo manga corta',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
    {
        id: '02',
        item: 'Short con rayas Mujer',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
]

const invoiceDetail17: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Playera cuello redondo manga corta',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
    {
        id: '02',
        item: 'Short con rayas Mujer',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
]

const invoiceDetail18: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Playera cuello redondo manga corta',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
    {
        id: '02',
        item: 'Short con rayas Mujer',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
]

const invoiceDetail19: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Playera cuello redondo manga corta',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
    {
        id: '02',
        item: 'Short con rayas Mujer',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
]

const invoiceDetail20: InvoiceDetail[] = [
    {
        id: '01',
        item: 'Playera cuello redondo manga corta',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
    {
        id: '02',
        item: 'Short con rayas Mujer',
        quantity: 1,
        priceUnit: 500,
        amount: 500,
    },
]

const pendingPayment01: PendingPayments = {
    dateOfIssue: '01-02-2023',
    iD: "00011",
    type: 'A',
    dueDate: '01-02-2023',
    state: 'CDMX',
    foreignExchange: 'Dollar',
    invoiceAmount: 1000,
    balanceDue: 500,
    billingPeriod: 'Jan-2023',
    data: invoiceDetail01
}

const pendingPayment02: PendingPayments = {
    dateOfIssue: '01-03-2023',
    iD: "00012",
    type: 'B',
    dueDate: '01-03-2023',
    state: 'CDMX',
    foreignExchange: 'Dollar',
    invoiceAmount: 2000,
    balanceDue: 1000,
    billingPeriod: 'Feb-2023',
    data: invoiceDetail02
}

const pendingPayment03: PendingPayments = {
    dateOfIssue: '01-04-2023',
    iD: "00033",
    type: 'C',
    dueDate: '01-04-2023',
    state: 'CDMX',
    foreignExchange: 'Dollar',
    invoiceAmount: 2500,
    balanceDue: 800,
    billingPeriod: 'Mar-2023',
    data: invoiceDetail03
}

const pendingPayment04: PendingPayments = {
    dateOfIssue: '01-04-2023',
    iD: "00014",
    type: 'C',
    dueDate: '01-04-2023',
    state: 'CDMX',
    foreignExchange: 'Dollar',
    invoiceAmount: 2500,
    balanceDue: 800,
    billingPeriod: 'Mar-2023',
    data: invoiceDetail04
}

const pendingPayment05: PendingPayments = {
    dateOfIssue: '01-04-2023',
    iD: "00015",
    type: 'C',
    dueDate: '01-04-2023',
    state: 'CDMX',
    foreignExchange: 'Dollar',
    invoiceAmount: 2500,
    balanceDue: 800,
    billingPeriod: 'Mar-2023',
    data: invoiceDetail05
}

const pendingPayment06: PendingPayments = {
    dateOfIssue: '01-04-2023',
    iD: "00016",
    type: 'C',
    dueDate: '01-04-2023',
    state: 'CDMX',
    foreignExchange: 'Dollar',
    invoiceAmount: 2500,
    balanceDue: 800,
    billingPeriod: 'Mar-2023',
    data: invoiceDetail06
}

const pendingPayment07: PendingPayments = {
    dateOfIssue: '01-04-2023',
    iD: "00017",
    type: 'C',
    dueDate: '01-04-2023',
    state: 'CDMX',
    foreignExchange: 'Dollar',
    invoiceAmount: 2500,
    balanceDue: 800,
    billingPeriod: 'Mar-2023',
    data: invoiceDetail07
}

const pendingPayment08: PendingPayments = {
    dateOfIssue: '01-04-2023',
    iD: "00018",
    type: 'C',
    dueDate: '01-04-2023',
    state: 'CDMX',
    foreignExchange: 'Dollar',
    invoiceAmount: 2500,
    balanceDue: 800,
    billingPeriod: 'Mar-2023',
    data: invoiceDetail08
}

const pendingPayment09: PendingPayments = {
    dateOfIssue: '01-04-2023',
    iD: "00019",
    type: 'C',
    dueDate: '01-04-2023',
    state: 'CDMX',
    foreignExchange: 'Dollar',
    invoiceAmount: 2500,
    balanceDue: 800,
    billingPeriod: 'Mar-2023',
    data: invoiceDetail09
}

const pendingPayment10: PendingPayments = {
    dateOfIssue: '01-04-2023',
    iD: "00020",
    type: 'C',
    dueDate: '01-04-2023',
    state: 'CDMX',
    foreignExchange: 'Dollar',
    invoiceAmount: 2500,
    balanceDue: 800,
    billingPeriod: 'Mar-2023',
    data: invoiceDetail10
}

const transactions01: Transactions = {
    transactionDate: '01-05-2023',
    invoiceID: '00001',
    paymentMethod: 'Cash',
    type: 'A',
    foreignExchange: 'Dollar',
    amount: 5000,
    billingPeriod: 'Apr-2023',
    data: invoiceDetail11
}

const transactions02: Transactions = {
    transactionDate: '01-06-2023',
    invoiceID: '00002',
    paymentMethod: 'Cash',
    type: 'B',
    foreignExchange: 'Dollar',
    amount: 2000,
    billingPeriod: 'May-2023',
    data: invoiceDetail12
}

const transactions03: Transactions = {
    transactionDate: '01-07-2023',
    invoiceID: '00003',
    paymentMethod: 'Cash',
    type: 'C',
    foreignExchange: 'Dollar',
    amount: 1000,
    billingPeriod: 'Jun-2023',
    data: invoiceDetail13
}

const transactions04: Transactions = {
    transactionDate: '01-07-2023',
    invoiceID: '00004',
    paymentMethod: 'Cash',
    type: 'A',
    foreignExchange: 'Dollar',
    amount: 1000,
    billingPeriod: 'Jun-2023',
    data: invoiceDetail14
}

const transactions05: Transactions = {
    transactionDate: '01-07-2023',
    invoiceID: '00005',
    paymentMethod: 'Cash',
    type: 'A',
    foreignExchange: 'Dollar',
    amount: 1000,
    billingPeriod: 'Jun-2023',
    data: invoiceDetail15
}

const transactions06: Transactions = {
    transactionDate: '01-07-2023',
    invoiceID: '00006',
    paymentMethod: 'Cash',
    type: 'A',
    foreignExchange: 'Dollar',
    amount: 1000,
    billingPeriod: 'Jun-2023',
    data: invoiceDetail16
}

const transactions07: Transactions = {
    transactionDate: '01-07-2023',
    invoiceID: '00007',
    paymentMethod: 'Cash',
    type: 'A',
    foreignExchange: 'Dollar',
    amount: 1000,
    billingPeriod: 'Jun-2023',
    data: invoiceDetail17
}

const transactions08: Transactions = {
    transactionDate: '01-07-2023',
    invoiceID: '00008',
    paymentMethod: 'Cash',
    type: 'A',
    foreignExchange: 'Dollar',
    amount: 1000,
    billingPeriod: 'Jun-2023',
    data: invoiceDetail18
}

const transactions09: Transactions = {
    transactionDate: '01-07-2023',
    invoiceID: '00009',
    paymentMethod: 'Cash',
    type: 'A',
    foreignExchange: 'Dollar',
    amount: 1000,
    billingPeriod: 'Jun-2023',
    data: invoiceDetail19
}

const transactions10: Transactions = {
    transactionDate: '01-07-2023',
    invoiceID: '00010',
    paymentMethod: 'Cash',
    type: 'A',
    foreignExchange: 'Dollar',
    amount: 1000,
    billingPeriod: 'Jun-2023',
    data: invoiceDetail20
}

export const pendingPayments = [
    pendingPayment01, 
    pendingPayment02, 
    pendingPayment03, 
    pendingPayment04, 
    pendingPayment05,
    pendingPayment06,
    pendingPayment07,
    pendingPayment08,
    pendingPayment09,
    pendingPayment10
];

export const transactions = [
    transactions01, 
    transactions02, 
    transactions03,
    transactions04,
    transactions05,
    transactions06,
    transactions07,
    transactions08,
    transactions09,
    transactions10,
];

