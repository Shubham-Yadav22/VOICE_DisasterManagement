import fs from 'fs'
import path from 'path'

export interface DonationData {
  name: string
  phone: string
  address: string
  resources: string[]
  otherItems?: string
  message?: string
  timestamp: string
}

export function writeDonationToFile(data: DonationData) {
  const donationsDir = path.join(process.cwd(), 'data', 'donations')
  
  // Create the donations directory if it doesn't exist
  if (!fs.existsSync(donationsDir)) {
    fs.mkdirSync(donationsDir, { recursive: true })
  }

  // Create a filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `donation_${timestamp}.txt`
  const filepath = path.join(donationsDir, filename)

  // Format the data for the text file
  const content = `
Donation Record
===============
Date: ${data.timestamp}
Name: ${data.name}
Phone: ${data.phone}
Address: ${data.address}

Resources to Donate:
${data.resources.map(item => `- ${item}`).join('\n')}

${data.otherItems ? `Other Items:\n${data.otherItems}\n` : ''}
${data.message ? `Additional Message:\n${data.message}\n` : ''}
===========================================
`

  // Write to file
  fs.writeFileSync(filepath, content)
  return filepath
} 