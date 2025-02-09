import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { Clock } from 'lucide-react';

// Complete list of countries with their timezones
const countries = [
  { label: 'Afghanistan', value: 'AF', timezone: 'Asia/Kabul' },
  { label: 'Albania', value: 'AL', timezone: 'Europe/Tirane' },
  { label: 'Algeria', value: 'DZ', timezone: 'Africa/Algiers' },
  { label: 'Andorra', value: 'AD', timezone: 'Europe/Andorra' },
  { label: 'Angola', value: 'AO', timezone: 'Africa/Luanda' },
  { label: 'Argentina', value: 'AR', timezone: 'America/Argentina/Buenos_Aires' },
  { label: 'Armenia', value: 'AM', timezone: 'Asia/Yerevan' },
  { label: 'Australia', value: 'AU', timezone: 'Australia/Sydney' },
  { label: 'Austria', value: 'AT', timezone: 'Europe/Vienna' },
  { label: 'Azerbaijan', value: 'AZ', timezone: 'Asia/Baku' },
  { label: 'Bahamas', value: 'BS', timezone: 'America/Nassau' },
  { label: 'Bahrain', value: 'BH', timezone: 'Asia/Bahrain' },
  { label: 'Bangladesh', value: 'BD', timezone: 'Asia/Dhaka' },
  { label: 'Barbados', value: 'BB', timezone: 'America/Barbados' },
  { label: 'Belarus', value: 'BY', timezone: 'Europe/Minsk' },
  { label: 'Belgium', value: 'BE', timezone: 'Europe/Brussels' },
  { label: 'Belize', value: 'BZ', timezone: 'America/Belize' },
  { label: 'Benin', value: 'BJ', timezone: 'Africa/Porto-Novo' },
  { label: 'Bhutan', value: 'BT', timezone: 'Asia/Thimphu' },
  { label: 'Bolivia', value: 'BO', timezone: 'America/La_Paz' },
  { label: 'Brazil', value: 'BR', timezone: 'America/Sao_Paulo' },
  { label: 'Bulgaria', value: 'BG', timezone: 'Europe/Sofia' },
  { label: 'Cambodia', value: 'KH', timezone: 'Asia/Phnom_Penh' },
  { label: 'Cameroon', value: 'CM', timezone: 'Africa/Douala' },
  { label: 'Canada', value: 'CA', timezone: 'America/Toronto' },
  { label: 'Chile', value: 'CL', timezone: 'America/Santiago' },
  { label: 'China', value: 'CN', timezone: 'Asia/Shanghai' },
  { label: 'Colombia', value: 'CO', timezone: 'America/Bogota' },
  { label: 'Costa Rica', value: 'CR', timezone: 'America/Costa_Rica' },
  { label: 'Croatia', value: 'HR', timezone: 'Europe/Zagreb' },
  { label: 'Cuba', value: 'CU', timezone: 'America/Havana' },
  { label: 'Cyprus', value: 'CY', timezone: 'Asia/Nicosia' },
  { label: 'Czech Republic', value: 'CZ', timezone: 'Europe/Prague' },
  { label: 'Denmark', value: 'DK', timezone: 'Europe/Copenhagen' },
  { label: 'Ecuador', value: 'EC', timezone: 'America/Guayaquil' },
  { label: 'Egypt', value: 'EG', timezone: 'Africa/Cairo' },
  { label: 'El Salvador', value: 'SV', timezone: 'America/El_Salvador' },
  { label: 'Estonia', value: 'EE', timezone: 'Europe/Tallinn' },
  { label: 'Ethiopia', value: 'ET', timezone: 'Africa/Addis_Ababa' },
  { label: 'Fiji', value: 'FJ', timezone: 'Pacific/Fiji' },
  { label: 'Finland', value: 'FI', timezone: 'Europe/Helsinki' },
  { label: 'France', value: 'FR', timezone: 'Europe/Paris' },
  { label: 'Georgia', value: 'GE', timezone: 'Asia/Tbilisi' },
  { label: 'Germany', value: 'DE', timezone: 'Europe/Berlin' },
  { label: 'Ghana', value: 'GH', timezone: 'Africa/Accra' },
  { label: 'Greece', value: 'GR', timezone: 'Europe/Athens' },
  { label: 'Guatemala', value: 'GT', timezone: 'America/Guatemala' },
  { label: 'Haiti', value: 'HT', timezone: 'America/Port-au-Prince' },
  { label: 'Honduras', value: 'HN', timezone: 'America/Tegucigalpa' },
  { label: 'Hong Kong', value: 'HK', timezone: 'Asia/Hong_Kong' },
  { label: 'Hungary', value: 'HU', timezone: 'Europe/Budapest' },
  { label: 'Iceland', value: 'IS', timezone: 'Atlantic/Reykjavik' },
  { label: 'India', value: 'IN', timezone: 'Asia/Kolkata' },
  { label: 'Indonesia', value: 'ID', timezone: 'Asia/Jakarta' },
  { label: 'Iran', value: 'IR', timezone: 'Asia/Tehran' },
  { label: 'Iraq', value: 'IQ', timezone: 'Asia/Baghdad' },
  { label: 'Ireland', value: 'IE', timezone: 'Europe/Dublin' },
  { label: 'Israel', value: 'IL', timezone: 'Asia/Jerusalem' },
  { label: 'Italy', value: 'IT', timezone: 'Europe/Rome' },
  { label: 'Jamaica', value: 'JM', timezone: 'America/Jamaica' },
  { label: 'Japan', value: 'JP', timezone: 'Asia/Tokyo' },
  { label: 'Jordan', value: 'JO', timezone: 'Asia/Amman' },
  { label: 'Kazakhstan', value: 'KZ', timezone: 'Asia/Almaty' },
  { label: 'Kenya', value: 'KE', timezone: 'Africa/Nairobi' },
  { label: 'Kuwait', value: 'KW', timezone: 'Asia/Kuwait' },
  { label: 'Kyrgyzstan', value: 'KG', timezone: 'Asia/Bishkek' },
  { label: 'Latvia', value: 'LV', timezone: 'Europe/Riga' },
  { label: 'Lebanon', value: 'LB', timezone: 'Asia/Beirut' },
  { label: 'Libya', value: 'LY', timezone: 'Africa/Tripoli' },
  { label: 'Liechtenstein', value: 'LI', timezone: 'Europe/Vaduz' },
  { label: 'Lithuania', value: 'LT', timezone: 'Europe/Vilnius' },
  { label: 'Luxembourg', value: 'LU', timezone: 'Europe/Luxembourg' },
  { label: 'Madagascar', value: 'MG', timezone: 'Indian/Antananarivo' },
  { label: 'Malaysia', value: 'MY', timezone: 'Asia/Kuala_Lumpur' },
  { label: 'Maldives', value: 'MV', timezone: 'Indian/Male' },
  { label: 'Malta', value: 'MT', timezone: 'Europe/Malta' },
  { label: 'Mexico', value: 'MX', timezone: 'America/Mexico_City' },
  { label: 'Monaco', value: 'MC', timezone: 'Europe/Monaco' },
  { label: 'Mongolia', value: 'MN', timezone: 'Asia/Ulaanbaatar' },
  { label: 'Montenegro', value: 'ME', timezone: 'Europe/Podgorica' },
  { label: 'Morocco', value: 'MA', timezone: 'Africa/Casablanca' },
  { label: 'Myanmar', value: 'MM', timezone: 'Asia/Yangon' },
  { label: 'Nepal', value: 'NP', timezone: 'Asia/Kathmandu' },
  { label: 'Netherlands', value: 'NL', timezone: 'Europe/Amsterdam' },
  { label: 'New Zealand', value: 'NZ', timezone: 'Pacific/Auckland' },
  { label: 'Nicaragua', value: 'NI', timezone: 'America/Managua' },
  { label: 'Nigeria', value: 'NG', timezone: 'Africa/Lagos' },
  { label: 'North Korea', value: 'KP', timezone: 'Asia/Pyongyang' },
  { label: 'Norway', value: 'NO', timezone: 'Europe/Oslo' },
  { label: 'Oman', value: 'OM', timezone: 'Asia/Muscat' },
  { label: 'Pakistan', value: 'PK', timezone: 'Asia/Karachi' },
  { label: 'Panama', value: 'PA', timezone: 'America/Panama' },
  { label: 'Papua New Guinea', value: 'PG', timezone: 'Pacific/Port_Moresby' },
  { label: 'Paraguay', value: 'PY', timezone: 'America/Asuncion' },
  { label: 'Peru', value: 'PE', timezone: 'America/Lima' },
  { label: 'Philippines', value: 'PH', timezone: 'Asia/Manila' },
  { label: 'Poland', value: 'PL', timezone: 'Europe/Warsaw' },
  { label: 'Portugal', value: 'PT', timezone: 'Europe/Lisbon' },
  { label: 'Qatar', value: 'QA', timezone: 'Asia/Qatar' },
  { label: 'Romania', value: 'RO', timezone: 'Europe/Bucharest' },
  { label: 'Russia', value: 'RU', timezone: 'Europe/Moscow' },
  { label: 'Saudi Arabia', value: 'SA', timezone: 'Asia/Riyadh' },
  { label: 'Senegal', value: 'SN', timezone: 'Africa/Dakar' },
  { label: 'Serbia', value: 'RS', timezone: 'Europe/Belgrade' },
  { label: 'Singapore', value: 'SG', timezone: 'Asia/Singapore' },
  { label: 'Slovakia', value: 'SK', timezone: 'Europe/Bratislava' },
  { label: 'Slovenia', value: 'SI', timezone: 'Europe/Ljubljana' },
  { label: 'South Africa', value: 'ZA', timezone: 'Africa/Johannesburg' },
  { label: 'South Korea', value: 'KR', timezone: 'Asia/Seoul' },
  { label: 'Spain', value: 'ES', timezone: 'Europe/Madrid' },
  { label: 'Sri Lanka', value: 'LK', timezone: 'Asia/Colombo' },
  { label: 'Sweden', value: 'SE', timezone: 'Europe/Stockholm' },
  { label: 'Switzerland', value: 'CH', timezone: 'Europe/Zurich' },
  { label: 'Syria', value: 'SY', timezone: 'Asia/Damascus' },
  { label: 'Taiwan', value: 'TW', timezone: 'Asia/Taipei' },
  { label: 'Thailand', value: 'TH', timezone: 'Asia/Bangkok' },
  { label: 'Tunisia', value: 'TN', timezone: 'Africa/Tunis' },
  { label: 'Turkey', value: 'TR', timezone: 'Europe/Istanbul' },
  { label: 'Ukraine', value: 'UA', timezone: 'Europe/Kiev' },
  { label: 'United Arab Emirates', value: 'AE', timezone: 'Asia/Dubai' },
  { label: 'United Kingdom', value: 'GB', timezone: 'Europe/London' },
  { label: 'United States', value: 'US', timezone: 'America/New_York' },
  { label: 'Uruguay', value: 'UY', timezone: 'America/Montevideo' },
  { label: 'Uzbekistan', value: 'UZ', timezone: 'Asia/Tashkent' },
  { label: 'Vatican City', value: 'VA', timezone: 'Europe/Vatican' },
  { label: 'Venezuela', value: 'VE', timezone: 'America/Caracas' },
  { label: 'Vietnam', value: 'VN', timezone: 'Asia/Ho_Chi_Minh' },
  { label: 'Yemen', value: 'YE', timezone: 'Asia/Aden' },
  { label: 'Zimbabwe', value: 'ZW', timezone: 'Africa/Harare' },
];

interface Country {
  label: string;
  value: string;
  timezone: string;
}

const TimeSelector = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = formatInTimeZone(
    currentTime,
    selectedCountry.timezone,
    'hh:mm:ss a'
  );

  const formattedDate = formatInTimeZone(
    currentTime,
    selectedCountry.timezone,
    'EEEE, MMMM do, yyyy'
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-panel px-6 py-4 mb-8">
        <div className="container mx-auto flex items-center gap-2">
          <Clock className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold text-white">What's the time in?</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="clock-container w-full max-w-lg">
          <div className="glass-panel p-8 space-y-8 animate-fade-in">
            <div className="space-y-2">
              <label className="block text-sm text-white/60">Select Country</label>
              <Select
                options={countries}
                value={selectedCountry}
                onChange={(option) => setSelectedCountry(option as Country)}
                className="select-container"
                classNamePrefix="select"
              />
            </div>
            
            <div className="text-center space-y-4">
              <h1 className="time-text text-7xl md:text-8xl animate-pulse-subtle">
                {formattedTime}
              </h1>
              <p className="text-white/60 text-lg">
                {formattedDate}
                <span className="ml-2 text-primary/80">
                  ({selectedCountry.timezone})
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
