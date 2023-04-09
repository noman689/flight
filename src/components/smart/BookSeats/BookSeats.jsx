import React from 'react';
import { SeatSelection } from '@duffel/components';
import '@duffel/components/dist/SeatSelection.min.css';

const BookSeats = () => {
  const passengers = [
    {
      id: 'pas_0000A8oTVsAt8YurG9h4xn',
      name: 'Amelia Earhart',
    },
    {
      id: 'pas_0000A8oTVsAt8YurG9h4xo',
      name: 'Charles Lindbergh',
    },
  ];

  const offer = {
    data: {
      slices: [
        {
          origin_type: 'airport',
          origin: {
            type: 'airport',
            time_zone: 'Europe/London',
            name: 'Heathrow',
            longitude: -141.951519,
            latitude: 64.068865,
            id: 'arp_lhr_gb',
            icao_code: 'EGLL',
            iata_country_code: 'GB',
            iata_code: 'LHR',
            iata_city_code: 'LON',
            city_name: 'London',
            city: {
              name: 'London',
              id: 'cit_lon_gb',
              iata_country_code: 'GB',
              iata_code: 'LON',
            },
            airports: [
              {
                time_zone: 'Europe/London',
                name: 'Heathrow',
                longitude: -141.951519,
                latitude: 64.068865,
                id: 'arp_lhr_gb',
                icao_code: 'EGLL',
                iata_country_code: 'GB',
                iata_code: 'LHR',
                iata_city_code: 'LON',
                city_name: 'London',
                city: {
                  name: 'London',
                  id: 'cit_lon_gb',
                  iata_country_code: 'GB',
                  iata_code: 'LON',
                },
              },
            ],
          },
          destination_type: 'airport',
          destination: {
            type: 'airport',
            time_zone: 'Europe/London',
            name: 'Heathrow',
            longitude: -141.951519,
            latitude: 64.068865,
            id: 'arp_lhr_gb',
            icao_code: 'EGLL',
            iata_country_code: 'GB',
            iata_code: 'LHR',
            iata_city_code: 'LON',
            city_name: 'London',
            city: {
              name: 'London',
              id: 'cit_lon_gb',
              iata_country_code: 'GB',
              iata_code: 'LON',
            },
            airports: [
              {
                time_zone: 'Europe/London',
                name: 'Heathrow',
                longitude: -141.951519,
                latitude: 64.068865,
                id: 'arp_lhr_gb',
                icao_code: 'EGLL',
                iata_country_code: 'GB',
                iata_code: 'LHR',
                iata_city_code: 'LON',
                city_name: 'London',
                city: {
                  name: 'London',
                  id: 'cit_lon_gb',
                  iata_country_code: 'GB',
                  iata_code: 'LON',
                },
              },
            ],
          },
          departure_date: '2024-02-24',
        },
      ],
      passengers: [null],
      offers: [
        {
          total_emissions_kg: '460',
          total_currency: 'GBP',
          total_amount: '45.00',
          tax_currency: 'GBP',
          tax_amount: '40.80',
          slices: [
            {
              segments: [
                {
                  stops: [
                    {
                      id: 'sto_00009htYpSCXrwaB9Dn456',
                      duration: 'PT02H26M',
                      departing_at: '2020-06-13T16:38:02',
                      airport: {
                        type: 'airport',
                        time_zone: 'Europe/London',
                        name: 'Heathrow',
                        longitude: -141.951519,
                        latitude: 64.068865,
                        id: 'arp_lhr_gb',
                        icao_code: 'EGLL',
                        iata_country_code: 'GB',
                        iata_code: 'LHR',
                        iata_city_code: 'LON',
                        city_name: 'London',
                        city: {
                          name: 'London',
                          id: 'cit_lon_gb',
                          iata_country_code: 'GB',
                          iata_code: 'LON',
                        },
                        airports: [
                          {
                            time_zone: 'Europe/London',
                            name: 'Heathrow',
                            longitude: -141.951519,
                            latitude: 64.068865,
                            id: 'arp_lhr_gb',
                            icao_code: 'EGLL',
                            iata_country_code: 'GB',
                            iata_code: 'LHR',
                            iata_city_code: 'LON',
                            city_name: 'London',
                            city: {
                              name: 'London',
                              id: 'cit_lon_gb',
                              iata_country_code: 'GB',
                              iata_code: 'LON',
                            },
                          },
                        ],
                      },
                    },
                  ],
                  passengers: [
                    {
                      passenger_id: 'passenger_0',
                      fare_basis_code: 'OXZ0RO',
                      cabin_class_marketing_name: 'Economy Basic',
                      cabin_class: 'economy',
                      cabin: {
                        name: 'economy',
                        marketing_name: 'Economy Basic',
                        amenities: {
                          'wi-fi': {
                            cost: 'free',
                            available: 'true',
                          },
                          seat: {
                            pitch: 32,
                            legroom: 'standard',
                          },
                          power: {
                            available: 'true',
                          },
                        },
                      },
                      baggages: [
                        {
                          type: 'checked',
                          quantity: 1,
                        },
                      ],
                    },
                  ],
                  origin_terminal: 'B',
                  origin: {
                    time_zone: 'Europe/London',
                    name: 'Heathrow',
                    longitude: -141.951519,
                    latitude: 64.068865,
                    id: 'arp_lhr_gb',
                    icao_code: 'EGLL',
                    iata_country_code: 'GB',
                    iata_code: 'LHR',
                    iata_city_code: 'LON',
                    city_name: 'London',
                    city: {
                      name: 'London',
                      id: 'cit_lon_gb',
                      iata_country_code: 'GB',
                      iata_code: 'LON',
                    },
                  },
                  operating_carrier_flight_number: '4321',
                  operating_carrier: {
                    name: 'British Airways',
                    logo_symbol_url:
                      'https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BA.svg',
                    logo_lockup_url:
                      'https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/BA.svg',
                    id: 'aln_00001876aqC8c5umZmrRds',
                    iata_code: 'BA',
                    conditions_of_carriage_url:
                      'https://www.britishairways.com/en-gb/information/legal/british-airways/general-conditions-of-carriage',
                  },
                  marketing_carrier_flight_number: '1234',
                  marketing_carrier: {
                    name: 'British Airways',
                    logo_symbol_url:
                      'https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BA.svg',
                    logo_lockup_url:
                      'https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/BA.svg',
                    id: 'aln_00001876aqC8c5umZmrRds',
                    iata_code: 'BA',
                    conditions_of_carriage_url:
                      'https://www.britishairways.com/en-gb/information/legal/british-airways/general-conditions-of-carriage',
                  },
                  id: 'seg_00009htYpSCXrwaB9Dn456',
                  duration: 'PT02H26M',
                  distance: '424.2',
                  destination_terminal: '5',
                  destination: {
                    type: 'airport',
                    time_zone: 'Europe/London',
                    name: 'Heathrow',
                    longitude: -141.951519,
                    latitude: 64.068865,
                    id: 'arp_lhr_gb',
                    icao_code: 'EGLL',
                    iata_country_code: 'GB',
                    iata_code: 'LHR',
                    iata_city_code: 'LON',
                    city_name: 'London',
                    city: {
                      name: 'London',
                      id: 'cit_lon_gb',
                      iata_country_code: 'GB',
                      iata_code: 'LON',
                    },
                    airports: [
                      {
                        time_zone: 'Europe/London',
                        name: 'Heathrow',
                        longitude: -141.951519,
                        latitude: 64.068865,
                        id: 'arp_lhr_gb',
                        icao_code: 'EGLL',
                        iata_country_code: 'GB',
                        iata_code: 'LHR',
                        iata_city_code: 'LON',
                        city_name: 'London',
                        city: {
                          name: 'London',
                          id: 'cit_lon_gb',
                          iata_country_code: 'GB',
                          iata_code: 'LON',
                        },
                      },
                    ],
                  },
                  departing_at: '2020-06-13T16:38:02',
                  arriving_at: '2020-06-13T16:38:02',
                  aircraft: {
                    name: 'Airbus Industries A380',
                    id: 'arc_00009UhD4ongolulWd91Ky',
                    iata_code: '380',
                  },
                },
              ],
              origin_type: 'airport',
              origin: {
                type: 'airport',
                time_zone: 'Europe/London',
                name: 'Heathrow',
                longitude: -141.951519,
                latitude: 64.068865,
                id: 'arp_lhr_gb',
                icao_code: 'EGLL',
                iata_country_code: 'GB',
                iata_code: 'LHR',
                iata_city_code: 'LON',
                city_name: 'London',
                city: {
                  name: 'London',
                  id: 'cit_lon_gb',
                  iata_country_code: 'GB',
                  iata_code: 'LON',
                },
                airports: [
                  {
                    time_zone: 'Europe/London',
                    name: 'Heathrow',
                    longitude: -141.951519,
                    latitude: 64.068865,
                    id: 'arp_lhr_gb',
                    icao_code: 'EGLL',
                    iata_country_code: 'GB',
                    iata_code: 'LHR',
                    iata_city_code: 'LON',
                    city_name: 'London',
                    city: {
                      name: 'London',
                      id: 'cit_lon_gb',
                      iata_country_code: 'GB',
                      iata_code: 'LON',
                    },
                  },
                ],
              },
              id: 'sli_00009htYpSCXrwaB9Dn123',
              fare_brand_name: 'Basic',
              duration: 'PT02H26M',
              destination_type: 'airport',
              destination: {
                type: 'airport',
                time_zone: 'Europe/London',
                name: 'Heathrow',
                longitude: -141.951519,
                latitude: 64.068865,
                id: 'arp_lhr_gb',
                icao_code: 'EGLL',
                iata_country_code: 'GB',
                iata_code: 'LHR',
                iata_city_code: 'LON',
                city_name: 'London',
                city: {
                  name: 'London',
                  id: 'cit_lon_gb',
                  iata_country_code: 'GB',
                  iata_code: 'LON',
                },
                airports: [
                  {
                    time_zone: 'Europe/London',
                    name: 'Heathrow',
                    longitude: -141.951519,
                    latitude: 64.068865,
                    id: 'arp_lhr_gb',
                    icao_code: 'EGLL',
                    iata_country_code: 'GB',
                    iata_code: 'LHR',
                    iata_city_code: 'LON',
                    city_name: 'London',
                    city: {
                      name: 'London',
                      id: 'cit_lon_gb',
                      iata_country_code: 'GB',
                      iata_code: 'LON',
                    },
                  },
                ],
              },
              conditions: {},
            },
          ],
          private_fares: [
            {
              type: 'corporate',
              tracking_reference: 'ABN:2345678',
              tour_code: '578DFL',
              corporate_code: 'FLX53',
            },
          ],
          payment_requirements: {
            requires_instant_payment: false,
            price_guarantee_expires_at: '2020-01-17T10:42:14Z',
            payment_required_by: '2020-01-17T10:42:14Z',
          },
          passengers: [
            {
              type: 'adult',
              loyalty_programme_accounts: [
                {
                  airline_iata_code: 'BA',
                  account_number: '12901014',
                },
              ],
              id: 'pas_00009hj8USM7Ncg31cBCL',
              given_name: 'Amelia',
              fare_type: 'contract_bulk',
              family_name: 'Earhart',
              age: 14,
            },
          ],
          passenger_identity_documents_required: false,
          partial: true,
          owner: {
            name: 'British Airways',
            logo_symbol_url:
              'https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BA.svg',
            logo_lockup_url:
              'https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/BA.svg',
            id: 'aln_00001876aqC8c5umZmrRds',
            iata_code: 'BA',
            conditions_of_carriage_url:
              'https://www.britishairways.com/en-gb/information/legal/british-airways/general-conditions-of-carriage',
          },
          live_mode: true,
          id: 'off_00009htYpSCXrwaB9DnUm0',
          expires_at: '2020-01-17T10:42:14.545Z',
          created_at: '2020-01-17T10:12:14.545Z',
          conditions: {
            refund_before_departure: {
              penalty_currency: 'GBP',
              penalty_amount: '100.00',
              allowed: true,
            },
            change_before_departure: {
              penalty_currency: 'GBP',
              penalty_amount: '100.00',
              allowed: true,
            },
          },
          base_currency: 'GBP',
          base_amount: '30.20',
          allowed_passenger_identity_document_types: ['passport'],
        },
      ],
      live_mode: false,
      id: 'orq_00009hjdomFOCJyxHG7k7k',
      created_at: '2020-02-12T15:21:01.927Z',
      cabin_class: 'economy',
    },
  };

  const seatMaps = {
    data: [
      {
        cabins: [
          {
            aisles: 2,
            cabin_class: 'economy',
            deck: 0,
            rows: [
              {
                sections: [
                  {
                    elements: [
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA1A',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '30.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '1A',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA1B',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '30.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '1B',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA1C',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '30.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '1C',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                    ],
                  },
                  {
                    elements: [
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA1D',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '30.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '1D',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA1E',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '30.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '1E',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [],
                        designator: '1F',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [],
                        designator: '1G',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                    ],
                  },
                  {
                    elements: [
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA1J',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '30.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '1H',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA1K',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '30.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '1J',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA1M',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '30.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '1K',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                    ],
                  },
                ],
              },
              {
                sections: [
                  {
                    elements: [
                      {
                        type: 'exit_row',
                      },
                    ],
                  },
                  {
                    elements: [],
                  },
                  {
                    elements: [
                      {
                        type: 'exit_row',
                      },
                    ],
                  },
                ],
              },
              {
                sections: [
                  {
                    elements: [
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA2A',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '20.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '2A',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA2B',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '20.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '2B',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA2C',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '20.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '2C',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                    ],
                  },
                  {
                    elements: [
                      {
                        available_services: [],
                        designator: '2D',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [],
                        designator: '2E',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA2F',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '20.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '2F',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA2G',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '20.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '2G',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                    ],
                  },
                  {
                    elements: [
                      {
                        available_services: [],
                        designator: '2H',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA2J',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '20.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '2J',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA2K',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '20.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '2K',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                    ],
                  },
                ],
              },
              {
                sections: [
                  {
                    elements: [
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA3A',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '3A',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [],
                        designator: '3B',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA3C',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '3C',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                    ],
                  },
                  {
                    elements: [
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA3D',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '3D',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA3E',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '3E',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA3F',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '3F',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [],
                        designator: '3G',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                    ],
                  },
                  {
                    elements: [
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA3H',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '3H',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA3J',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '3J',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA3K',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '3K',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                    ],
                  },
                ],
              },
              {
                sections: [
                  {
                    elements: [
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA4A',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '4A',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA4B',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '4B',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA4C',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '4C',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                    ],
                  },
                  {
                    elements: [
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA4D',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '4D',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA4E',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '4E',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA4F',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '4F',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA4G',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '4G',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                    ],
                  },
                  {
                    elements: [
                      {
                        available_services: [],
                        designator: '4H',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [],
                        designator: '4J',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                      {
                        available_services: [
                          {
                            id: 'ase_00009UhD4ongolulWAAA4K',
                            passenger_id: 'pas_00009hj8USM7Ncg31cAAA',
                            total_amount: '10.00',
                            total_currency: 'GBP',
                          },
                        ],
                        designator: '4K',
                        disclosures: [],
                        name: '',
                        type: 'seat',
                      },
                    ],
                  },
                ],
              },
              {
                sections: [
                  {
                    elements: [
                      {
                        type: 'lavatory',
                      },
                    ],
                  },
                  {
                    elements: [],
                  },
                  {
                    elements: [
                      {
                        type: 'lavatory',
                      },
                    ],
                  },
                ],
              },
              {
                sections: [
                  {
                    elements: [
                      {
                        type: 'galley',
                      },
                    ],
                  },
                  {
                    elements: [
                      {
                        type: 'galley',
                      },
                    ],
                  },
                  {
                    elements: [
                      {
                        type: 'galley',
                      },
                    ],
                  },
                ],
              },
            ],
            wings: {
              first_row_index: 1,
              last_row_index: 2,
            },
          },
        ],
        id: 'sea_00003hthlsHZ8W4LxXjkzo',
        segment_id: 'seg_00009htYpSCXrwaB9Dn456',
        slice_id: 'sli_00009htYpSCXrwaB9Dn123',
      },
    ],
  };

  return (
    <SeatSelection
      offer={offer}
      seatMaps={seatMaps}
      passengers={passengers}
      // onSubmit={onSubmitFn}
      // currencyConversion={currencyConversion} /* optional */
      // initialSeatSelection={initialSeatSelection} /* optional */
      // initialSegmentId={initialSegmentId} /* optional */
    />
  );
};

export default BookSeats;
