import type { HowToVideo } from '../types';

const CATEGORY_VIDEOS: Record<string, HowToVideo[]> = {
  tools: [
    { id: 't1', title: 'Essential Hand Tools Every DIYer Needs', thumbnail: 'https://images.pexels.com/photos/162553/works-workshop-bench-grinder-162553.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '12:34', query: 'hand tools for beginners' },
    { id: 't2', title: 'How to Use a Power Drill for Beginners', thumbnail: 'https://images.pexels.com/photos/402029/pexels-photo-402029.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '8:21', query: 'how to use power drill' },
    { id: 't3', title: 'Home Repair Toolkit Must-Haves', thumbnail: 'https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '15:07', query: 'home repair tool kit' },
    { id: 't4', title: 'How to Patch and Paint Drywall', thumbnail: 'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '10:45', query: 'drywall repair tutorial' },
    { id: 't5', title: 'Beginners Guide to Woodworking', thumbnail: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '22:18', query: 'woodworking for beginners' },
    { id: 't6', title: 'How to Fix a Leaky Faucet', thumbnail: 'https://images.pexels.com/photos/62693/water-faucet-tap-steel-62693.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '6:52', query: 'fix leaky faucet' },
    { id: 't7', title: 'Cordless Drill Tips and Techniques', thumbnail: 'https://images.pexels.com/photos/402029/pexels-photo-402029.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '9:15', query: 'how to use cordless drill' },
    { id: 't8', title: 'Sanding and Finishing Wood Projects', thumbnail: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '14:30', query: 'how to sand wood' },
  ],
  tech: [
    { id: 'e1', title: 'How to Build a Custom PC', thumbnail: 'https://images.pexels.com/photos/258072/pexels-photo-258072.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '18:42', query: 'build custom PC guide' },
    { id: 'e2', title: 'Soldering Basics for Electronics Repair', thumbnail: 'https://images.pexels.com/photos/163100/circuit-board-circuits-computer-electronics-163100.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '11:30', query: 'soldering electronics tutorial' },
    { id: 'e3', title: 'Smart Home Setup Guide', thumbnail: 'https://images.pexels.com/photos/4040769/pexels-photo-4040769.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '14:15', query: 'smart home setup tutorial' },
    { id: 'e4', title: 'How to Repair a Broken Phone Screen', thumbnail: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '20:33', query: 'phone screen repair' },
    { id: 'e5', title: 'Raspberry Pi Projects for Beginners', thumbnail: 'https://images.pexels.com/photos/270118/pexels-photo-270118.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '16:08', query: 'raspberry pi projects' },
    { id: 'e6', title: 'Cable Management Tips and Tricks', thumbnail: 'https://images.pexels.com/photos/2577364/pexels-photo-2577364.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '7:44', query: 'cable management guide' },
    { id: 'e7', title: 'Router Setup and Network Basics', thumbnail: 'https://images.pexels.com/photos/258072/pexels-photo-258072.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '11:20', query: 'how to fix router issues' },
    { id: 'e8', title: 'Laptop Battery Replacement Guide', thumbnail: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '8:45', query: 'replace laptop battery' },
  ],
  software: [
    { id: 's1', title: 'Getting Started with AI Coding Assistants', thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '13:21', query: 'AI coding assistant tutorial' },
    { id: 's2', title: 'Automate Your Workflow with No-Code Tools', thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '9:55', query: 'no-code automation tools' },
    { id: 's3', title: 'How to Build a Chatbot from Scratch', thumbnail: 'https://images.pexels.com/photos/8294554/pexels-photo-8294554.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '17:40', query: 'build chatbot tutorial' },
    { id: 's4', title: 'Prompt Engineering Masterclass', thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '24:12', query: 'prompt engineering guide' },
    { id: 's5', title: 'Best Free AI Tools for Productivity', thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '11:08', query: 'best AI productivity tools' },
    { id: 's6', title: 'How to Create AI-Generated Art', thumbnail: 'https://images.pexels.com/photos/6625880/pexels-photo-6625880.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '8:33', query: 'AI art generation tutorial' },
    { id: 's7', title: 'ChatGPT Complete Guide for Beginners', thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '19:45', query: 'how to use ChatGPT' },
    { id: 's8', title: 'AI Tools for Content Creation', thumbnail: 'https://images.pexels.com/photos/6625880/pexels-photo-6625880.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '12:30', query: 'AI content creation tools' },
  ],
  home: [
    { id: 'h1', title: 'Deep Clean Your Home Like a Pro', thumbnail: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '14:22', query: 'deep clean home guide' },
    { id: 'h2', title: 'Budget-Friendly Room Makeover Ideas', thumbnail: 'https://images.pexels.com/photos/6588756/pexels-photo-6588756.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '19:45', query: 'budget room makeover' },
    { id: 'h3', title: 'How to Organize Every Room in Your House', thumbnail: 'https://images.pexels.com/photos/6444/desk-notebook-notes-6444.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '16:30', query: 'home organization tips' },
    { id: 'h4', title: 'DIY Shelving Solutions for Small Spaces', thumbnail: 'https://images.pexels.com/photos/1125328/pexels-photo-1125328.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '11:15', query: 'DIY shelving ideas' },
    { id: 'h5', title: 'How to Refinish Furniture', thumbnail: 'https://images.pexels.com/photos/109638/pexels-photo-109638.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '13:50', query: 'refinish furniture tutorial' },
    { id: 'h6', title: 'Indoor Plant Care for Beginners', thumbnail: 'https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '9:18', query: 'indoor plant care' },
    { id: 'h7', title: 'Window Cleaning Streak-Free', thumbnail: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '7:30', query: 'how to clean windows' },
    { id: 'h8', title: 'Declutter Your Home in a Weekend', thumbnail: 'https://images.pexels.com/photos/6444/desk-notebook-notes-6444.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '15:20', query: 'declutter your home' },
  ],
  craft: [
    { id: 'c1', title: 'Beginners Guide to Resin Art', thumbnail: 'https://images.pexels.com/photos/6963943/pexels-photo-6963943.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '15:33', query: 'resin art for beginners' },
    { id: 'c2', title: 'How to Start Crocheting', thumbnail: 'https://images.pexels.com/photos/3845531/pexels-photo-3845531.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '12:10', query: 'learn to crochet' },
    { id: 'c3', title: 'DIY Candle Making at Home', thumbnail: 'https://images.pexels.com/photos/3739572/pexels-photo-3739572.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '8:47', query: 'DIY candle making' },
    { id: 'c4', title: 'Hand Lettering and Calligraphy Basics', thumbnail: 'https://images.pexels.com/photos/19694529/pexels-photo-19694529.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '10:22', query: 'hand lettering tutorial' },
    { id: 'c5', title: 'Upcycle Old Clothes into New Favorites', thumbnail: 'https://images.pexels.com/photos/6765028/pexels-photo-6765028.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '14:05', query: 'upcycle clothes ideas' },
    { id: 'c6', title: 'Scrapbook Design Ideas and Tips', thumbnail: 'https://images.pexels.com/photos/6975032/pexels-photo-6975032.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '7:55', query: 'scrapbook design ideas' },
    { id: 'c7', title: 'Sharpie Art Techniques', thumbnail: 'https://images.pexels.com/photos/19694529/pexels-photo-19694529.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '9:15', query: 'sharpie marker art' },
    { id: 'c8', title: 'Easy Crafts with Household Items', thumbnail: 'https://images.pexels.com/photos/6963943/pexels-photo-6963943.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '11:40', query: 'DIY crafts for beginners' },
  ],
  garden: [
    { id: 'g1', title: 'How to Start a Vegetable Garden', thumbnail: 'https://images.pexels.com/photos/2252467/pexels-photo-2252467.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '16:40', query: 'start vegetable garden' },
    { id: 'g2', title: 'Build Raised Garden Beds', thumbnail: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '11:25', query: 'build raised garden beds' },
    { id: 'g3', title: 'Composting 101 for Beginners', thumbnail: 'https://images.pexels.com/photos/3738954/pexels-photo-3738954.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '9:12', query: 'composting for beginners' },
    { id: 'g4', title: 'Landscaping on a Budget', thumbnail: 'https://images.pexels.com/photos/1407054/pexels-photo-1407054.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '13:58', query: 'budget landscaping' },
    { id: 'g5', title: 'How to Prune Trees and Shrubs', thumbnail: 'https://images.pexels.com/photos/5765315/pexels-photo-5765315.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '8:30', query: 'prune trees and shrubs' },
    { id: 'g6', title: 'Container Gardening for Small Spaces', thumbnail: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '10:15', query: 'container gardening tips' },
    { id: 'g7', title: 'Lawn Care Made Simple', thumbnail: 'https://images.pexels.com/photos/1407054/pexels-photo-1407054.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '12:30', query: 'lawn care tips' },
    { id: 'g8', title: 'Growing Herbs Indoors', thumbnail: 'https://images.pexels.com/photos/2252467/pexels-photo-2252467.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '8:45', query: 'grow herbs indoors' },
  ],
};

const PRODUCT_VIDEOS: Record<string, HowToVideo[]> = {
  'Duct Tape': [
    { id: 'pt1', title: '10 Genius Duct Tape Hacks', thumbnail: 'https://images.pexels.com/photos/162553/works-workshop-bench-grinder-162553.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '7:20', query: 'how to use duct tape' },
    { id: 'pt2', title: 'Duct Tape Wallet DIY Tutorial', thumbnail: 'https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '5:45', query: 'duct tape wallet DIY' },
    { id: 'pt3', title: 'Emergency Repairs with Duct Tape', thumbnail: 'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '9:10', query: 'duct tape emergency repairs' },
  ],
  'WD-40 Spray': [
    { id: 'pw1', title: '20 Surprising WD-40 Uses', thumbnail: 'https://images.pexels.com/photos/162553/works-workshop-bench-grinder-162553.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '8:30', query: 'WD-40 surprising uses' },
    { id: 'pw2', title: 'How to Remove Rust with WD-40', thumbnail: 'https://images.pexels.com/photos/402029/pexels-photo-402029.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '6:15', query: 'how to remove rust WD-40' },
    { id: 'pw3', title: 'WD-40 vs Liquid Wrench Comparison', thumbnail: 'https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '10:42', query: 'WD-40 comparison test' },
  ],
  'Gorilla Glue': [
    { id: 'pg1', title: 'How to Use Gorilla Glue Properly', thumbnail: 'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '5:50', query: 'how to use gorilla glue' },
    { id: 'pg2', title: 'Strongest Glue Bond Test', thumbnail: 'https://images.pexels.com/photos/162553/works-workshop-bench-grinder-162553.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '12:30', query: 'gorilla glue bond test' },
    { id: 'pg3', title: 'Wood Glue vs Gorilla Glue', thumbnail: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=400', source: 'YouTube', duration: '8:15', query: 'wood glue vs gorilla glue' },
  ],
};

export function getVideosForProduct(productName: string, categorySlug: string, searchQuery?: string): HowToVideo[] {
  // Check for product-specific videos first
  const productSpecific = PRODUCT_VIDEOS[productName];

  if (productSpecific) {
    const categoryGeneral = CATEGORY_VIDEOS[categorySlug] || CATEGORY_VIDEOS.tools;
    return [...productSpecific, ...categoryGeneral.slice(0, 3)];
  }

  // Get category videos
  const categoryVideos = CATEGORY_VIDEOS[categorySlug] || CATEGORY_VIDEOS.tools;

  // If we have a search query, try to find videos that match
  if (searchQuery) {
    const queryTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 3);

    // Score videos by query relevance
    const scoredVideos = categoryVideos.map(video => {
      const videoText = `${video.title} ${video.query}`.toLowerCase();
      let score = 0;

      for (const term of queryTerms) {
        if (videoText.includes(term)) {
          score += 1;
        }
      }

      return { video, score };
    });

    // Sort by score (descending), then keep original order for ties
    scoredVideos.sort((a, b) => b.score - a.score);

    // If we found good matches, prioritize them
    const matchedVideos = scoredVideos
      .filter(s => s.score > 0)
      .map(s => s.video);

    if (matchedVideos.length >= 2) {
      // Return matched videos first, then fill with category videos
      const remaining = categoryVideos.filter(v => !matchedVideos.includes(v));
      return [...matchedVideos.slice(0, 4), ...remaining.slice(0, 2)];
    }
  }

  return categoryVideos;
}
