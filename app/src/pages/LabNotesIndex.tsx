import { ArticleLayout } from '../components/ArticleLayout';
import { LabHeaderVisual } from '../components/LabHeaderVisual';
import { labNotePosts } from '../data/labNotes';

export default function LabNotesIndex() {
  return (
    <ArticleLayout section="lab-notes">
      <header className="lab-header">
        <div className="lab-header-inner">
          <div>
            <p className="lab-eyebrow">Lab Notebook</p>
            <h1>Lab Notes</h1>
            <p>
              A running log of what I'm actually learning while building LittleDevLab — agentic AI,
              3D design/print, Python, home automation, and AI-assisted home remodeling —
              documented as I go.
            </p>
          </div>
          <LabHeaderVisual />
        </div>
      </header>

      <main>
        <div className="container">
          <ul className="post-list">
            {labNotePosts.map((post) => (
              <li key={post.href}>
                <span className="tag">{post.tag}</span>
                <h3>
                  <a href={post.href}>{post.title}</a>
                </h3>
                <p className="post-meta">{post.date}</p>
                <p className="excerpt">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </ArticleLayout>
  );
}
