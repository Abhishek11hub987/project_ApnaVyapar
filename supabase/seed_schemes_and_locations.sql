-- Government Schemes Seed Data
INSERT INTO government_schemes (name, ministry, category, description, eligibility, benefits, max_amount, interest_rate, application_link, is_active) VALUES
('Pradhan Mantri Mudra Yojana', 'Ministry of Finance', 'Loan', 'Collateral-free loans for micro enterprises', 'Non-farm micro enterprises, age 18+', 'Loans up to ₹10 lakh without collateral', '₹10,00,000', '8% - 12%', 'https://www.mudra.org.in', true),
('Startup India Seed Fund', 'DPIIT', 'Grant', 'Financial assistance to startups for proof of concept', 'DPIIT-recognized startups', 'Grants up to ₹1 crore', '₹1,00,00,000', 'N/A', 'https://seedfund.startupindia.gov.in', true),
('CGTMSE', 'Ministry of MSME', 'Loan', 'Credit Guarantee for MSME loans', 'All MSMEs', 'Collateral-free loans up to ₹1 crore', '₹1,00,00,000', 'N/A', 'https://cgtmse.in', true),
('Stand-Up India', 'SIDBI', 'Loan', 'Loans for SC/ST and women entrepreneurs', 'SC/ST or women, age 18+', 'Loans ₹10 lakh - ₹1 crore', '₹1,00,00,000', 'Base rate + 3%', 'https://www.standupmitra.in', true),
('Udyam Registration', 'Ministry of MSME', 'Tax Benefit', 'Free MSME registration', 'All MSMEs', 'Subsidies, tax exemptions, priority lending', 'N/A', 'N/A', 'https://udyamregistration.gov.in', true);

-- Resource Locations Seed Data
INSERT INTO resource_locations (name, type, address, city, state, latitude, longitude, phone, email) VALUES
('MSME Development Institute', 'MSME-DI', 'Okhla Industrial Estate', 'New Delhi', 'Delhi', 28.5522, 77.2721, '011-26838068', 'dcdi-ndelhi@dcmsme.gov.in'),
('District Industries Centre', 'DIC', 'Kandivali East', 'Mumbai', 'Maharashtra', 19.2045, 72.8687, '022-28864388', 'dicmumbai@maharashtra.gov.in'),
('T-Hub Incubator', 'Incubator', 'Knowledge City, Raidurg', 'Hyderabad', 'Telangana', 17.4399, 78.3756, '040-41223400', 'info@t-hub.co'),
('State Bank of India - SME Branch', 'Bank Branch', 'Koramangala 4th Block', 'Bangalore', 'Karnataka', 12.9345, 77.6266, '080-25530188', 'sbi.sme@sbi.co.in');
