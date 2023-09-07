interface IAccount {
    id: string,
    object: string,
    code: string,
    email: string,
    first_name: string,
    last_name: string | null,
    company: string | null,
    parent_account_id: string | null,
    bill_to: string,
    dunning_campaign_id: string | null
}

interface IAddress {
    name_on_account: string | null,
    first_name: string,
    last_name: string,
    company: string,
    street1: string,
    street2: string,
    city: string,
    region: string,
    postal_code: string,
    country: string
}

interface IInvoiceDetail {
    id: string,
    object: string,
    number: string,
    type: string,
    state: string,
    business_entity_id: string
}

interface IBillingAddress {
    street1: string,
    street2: string,
    city: string,
    region: string,
    postal_code: string,
    country: string,
    first_name: string,
    last_name: string,
    phone: string | null
}

interface IPaymentMethod {
    object: string,
    card_type: string,
    first_six: string,
    last_four: string,
    cc_bin_country: string | null,
    exp_month: number,
    exp_year: number
}

interface IPaymentGateway {
    id: string | null,
    object: string,
    type: string,
    name: string
}

interface ITransctionsInvoice {
    id: string,
    object: string,
    uuid: string,
    account: IAccount,
    invoice: IInvoiceDetail,
    voided_by_invoice: string | null,
    subscription_ids: [],
    original_transaction_id: string | null,
    type: string,
    origin: string,
    currency: string,
    amount: number,
    status: string,
    success: boolean,
    backup_payment_method_used: boolean,
    refunded: boolean,
    billing_address: IBillingAddress,
    collection_method: string,
    payment_method: IPaymentMethod,
    ip_address_v4: string | null,
    ip_address_country: string | null,
    status_code: string | null,
    status_message: string | null,
    customer_message: string | null,
    customer_message_locale: string,
    payment_gateway: IPaymentGateway,
    gateway_message: string,
    gateway_reference: string,
    gateway_approval_code: string | null,
    gateway_response_code: string | null,
    gateway_response_time: number,
    gateway_response_values:{
        transaction_type: string | null
    },
    cvv_check: string | null,
    avs_check: string,
    created_at: string,
    updated_at: string,
    voided_at: string | null,
    collected_at: string,
    action_result: string | null,
    vat_number: string | null
}

interface ILineItems {
	id: string,
    object: string,
    uuid: string,
    type: string,
    state: string,
    legacy_category: string | null,
    account: IAccount,
    bill_for_account_id: string,
    subscription_id: string,
    plan_id: string,
    plan_code: string,
    add_on_id: string | null,
    add_on_code: string | null,
    invoice_id: string,
    invoice_number: string,
    previous_line_item_id: string | null,
    original_line_item_invoice_id: string | null,
    origin: string,
    accounting_code: string,
    product_code: string,
    credit_reason_code: string | null,
    currency: string,
    amount: number,
    description: string,
    quantity: number,
    unit_amount: number,
    unit_amount_decimal: string | null,
    subtotal: number,
    discount: number,
    tax: number,
    taxable: boolean,
    tax_exempt: boolean,
    tax_code: string | null,
    tax_info: string | null,
    proration_rate: string | null,
    refund: boolean,
    refunded_quantity: string | null,
    credit_applied: string | null,
    shipping_address: string | null,
    item_code: string | null,
    item_id: string | null,
    external_sku: string | null,
    revenue_schedule_type: string,
    start_date: string,
    end_date: string,
    created_at: string,
    updated_at: string,
    custom_fields:[]
}

interface IPlan {
    id: string,
    object: string,
    code: string,
    name: string
}

interface IShipping {
    object: string,
    address: string | null,
    method: string | null,
    amount: number
}

export interface IInvoice {
	id: string,
    uuid: string,
    object: string,
    type: string,
    origin: string,
    state: string,
	account: IAccount,
	billing_info_id: string | null,
	subscription_ids: [],
	previous_invoice_id: string | null,
    number: string,
    collection_method: string,
    po_number: string | null,
    net_terms: number,
	address: IAddress,
	currency: string,
    balance: number,
    paid: number,
    total: number,
    subtotal: number,
    refundable_amount: number,
    discount: number,
    tax: number,
    tax_info: string | null,
    used_tax_service: boolean,
    vat_number: string | null,
    vat_reverse_charge_notes: string | null,
    terms_and_conditions: string | null,
    customer_notes: string | null,
	line_items: ILineItems[],
	has_more_line_items:boolean,
	transactions: ITransctionsInvoice[],
	credit_payments:[],
	shipping_address: string | null,
    created_at: string,
    updated_at: string,
    due_at: string,
    closed_at: string,
    dunning_campaign_id: string | null,
    dunning_events_sent: number,
    final_dunning_event: boolean,
    business_entity_id: string
}

export interface ITransactions {
    id: string,
    object: string,
    uuid: string,
    account: IAccount,
    invoice: IInvoiceDetail | null,
    voided_by_invoice: string | null,
    subscription_ids:[],
    original_transaction_id: string | null,
    type: string,
    origin: string,
    currency: string,
    amount: number,
    status: string,
    success: boolean,
    backup_payment_method_used: boolean,
    refunded: boolean,
    billing_address: IBillingAddress,
    collection_method: string,
    payment_method: IPaymentMethod,
    ip_address_v4: string | null,
    ip_address_country: string | null,
    status_code: string | null,
    status_message: string | null,
    customer_message: string | null,
    customer_message_locale: string,
    payment_gateway: IPaymentGateway,
    gateway_message: string,
    gateway_reference: string,
    gateway_approval_code: string | null,
    gateway_response_code: string | null,
    gateway_response_time: number,
    gateway_response_values:{
        transaction_type: string | null
    },
    cvv_check: string,
    avs_check: string,
    created_at: string,
    updated_at: string,
    voided_at: string,
    collected_at: string,
    action_result: string | null,
    vat_number: string | null
}

export interface ISubscriptions {
    id: string,
    object: string,
    uuid: string,
    account: IAccount,
    billing_info_id: string | null,
    active_invoice_id: string,
    plan: IPlan,
    state: string,
    shipping: IShipping,
    coupon_redemptions: any | null,
    pending_change: any | null,
    current_period_started_at: string,
    current_period_ends_at: string,
    current_term_started_at: string,
    current_term_ends_at: string,
    trial_started_at: string,
    trial_ends_at: string,
    remaining_billing_cycles: number,
    total_billing_cycles: number,
    renewal_billing_cycles: number,
    revenue_schedule_type: string,
    auto_renew: boolean,
    paused_at: any | null,
    remaining_pause_cycles: any | null,
    currency: string,
    tax_inclusive: any | null,
    unit_amount: number,
    quantity: number,
    add_ons: [],
    add_ons_total: number,
    subtotal: number,
    collection_method: string,
    po_number: any | null,
    net_terms: number,
    terms_and_conditions: any | null,
    customer_notes: any | null,
    expiration_reason: any | null,
    custom_fields: [],
    bank_account_authorized_at: any | null,
    gateway_code: any | null,
    started_with_gift: boolean,
    converted_at: any | null,
    created_at: string,
    updated_at: string,
    activated_at: string,
    canceled_at: any | null,
    expires_at: any | null,
    action_result: any | null,
    tax: number,
    tax_info: any | null,
    total: number,
    ramp_intervals: []
}

export interface IUserProfile {
    created_at: string,
    email: string,
    email_verified: boolean,
    family_name: string,
    given_name: string,
    identities: [],
    locale?: string,
    name: string,
    nickname: string,
    picture: string,
    updated_at: string,
    user_id: string,
    user_metadata?: any,
    last_login?: string,
    last_ip: string,
    logins_count: number,
    app_metadata?: any
}

export interface IRoles {
    id: string,
    name: string,
    description: string
}

export interface IUserInfo {
	user_id: string,
    email: string,
    picture: string,
    name: string
}

export interface IDepartments {
    id: string,
    name: string,
    display_name: string
}